import React from "react";
import { Link } from "react-router-dom";
import Rest from "../../utils/rest";

const baseURL = "https://quickstart-1559928541926.firebaseio.com/";

const { useGet } = Rest(baseURL);

const Meses = () => {
  const data = useGet("meses");

  if (data.loading) {
    return <span>Carregando...</span>;
  }
  if (Object.keys(data.data).length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão de entrada</th>
            <th>Entrada</th>

            <th>Previsão de saida</th>
            <th>Saida</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data.data).map(mes => {
            return (
              <tr key={mes}>
                <td>
                  <Link to={`/movimentacoes/${mes}`}>{mes}</Link>
                </td>
                <td>{data.data[mes].previsao_entrada}</td>
                <td>{data.data[mes].entrada}</td>
                <td>{data.data[mes].previsao_saida}</td>
                <td>{data.data[mes].saida}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return null;
};

export default Meses;
