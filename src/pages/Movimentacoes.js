import React, { useState } from "react";

import Rest from "../utils/rest";

const baseURL = "https://quickstart-1559928541926.firebaseio.com/";

const { useGet, usePost, useDelete } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`);
  const dataMeses = useGet(`meses/${match.params.data}`);
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remover] = useDelete();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value);
  };

  const onChangeValor = evt => {
    setValor(evt.target.value);
  };

  const resetValues = () => {
    setDescricao("");
    setValor(0);
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      });
      resetValues();
      data.refetch();
      await sleep(5000);
      dataMeses.refetch();
    }
  };

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  const removerMovimentacao = async id => {
    await remover(`movimentacoes/${match.params.data}/${id}`);
    data.refetch();
    await sleep(5000);
    dataMeses.refetch();
  };
  return (
    <div className="container">
      <h1>Movimentações</h1>
      {!dataMeses.loading && (
        <div>
          Previsão de entrada: {dataMeses.data.previsao_entrada} / Previsão de
          saida: {dataMeses.data.previsao_saida}
          <br></br>
          Entradas: {dataMeses.data.entradas} / Saida: {dataMeses.data.saidas}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object.keys(data.data).map(movimentacao => {
              return (
                <tr key={movimentacao}>
                  <td>{data.data[movimentacao].descricao}</td>
                  <td className="text-right">
                    {data.data[movimentacao].valor}
                  </td>{" "}
                  <button
                    onClick={() => removerMovimentacao(movimentacao)}
                    className="btn btn-danger"
                  >
                    remover
                  </button>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                type="text"
                value={descricao}
                onChange={onChangeDescricao}
              />
            </td>
            <td>
              <input type="text" value={valor} onChange={onChangeValor} />{" "}
              <button onClick={salvarMovimentacao} className="btn btn-primary">
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Movimentacoes;
