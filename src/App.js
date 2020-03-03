import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Movimentacoes from "./pages/Movimentacoes";
const App = () => {
  return (
    <Router>
      <Switch>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/movimentacoes/:data" exact component={Movimentacoes} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
