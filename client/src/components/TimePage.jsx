import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import instance from "../axios";


function TimePage(props){
    
    const [result, setResult] = useState("");
    const location = useLocation();
    const linha = location.state.linha;
    var id = 0;

    useEffect(() => {
      instance.post("api/tempos", {linha: linha}).then(response => {
        setResult(response.data);
      });
    }, [linha]);

    function createEntry(data){
      return (
        <tr className="in-table" key={id++}>
          <th scope="row">{data.estacao}</th>
          <th>{data.destino}</th>
          <th>{data.chegada1}</th>
          <th>{data.chegadas_seguintes}</th>
        </tr>
      )
    }

    return (
        <div className="TimePage">
            <Header />
            {result && <div className="container">
              <div>
                <h1 className="display-5 lh-1 mb-3">Tempos de espera da linha {result.line}</h1>
                <p className="lead">Última atualização: {result.date}</p>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Estação</th>
                    <th scope="col">Destino</th>
                    <th scope="col">Próx. Chegada</th>
                    <th scope="col">Chegadas Seguintes</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.map(createEntry)}
                </tbody>
              </table>
            </div>}

            <Footer />
        </div>
    )
}

export default TimePage;