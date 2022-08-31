import React, { useEffect, useState } from "react";
import Header from "./Header";
import StatusCard from "./StatusCard";
import Footer from "./Footer";
import Hero from "./Hero";
import instance from "../axios";


function Home(){

    const [result, setResult] = useState("");

    useEffect(() => {
        instance.get("api/estadoServico").then(response => {
            setResult(response.data);
        });
    } , []);

    console.log("on client: " + result);

    return (
        <div className="Home">
            <Header />
            <div className="area">
              <Hero />
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              </div>
              <h1 className="display-5 fw-bold lh-1 mb-3" id='h1-above-cards'>Estado das Linhas</h1>
              {result && <div className="status-cards">
                  <div className="line-row">
                    <div className="column">

                      <StatusCard 
                        line="Amarela"
                        status={result.amarela}
                        message={result.tipo_msg_am}
                      />
                    </div>
                    <div className="column">
                      <StatusCard 
                        line="Azul"
                        status={result.azul}
                        message={result.tipo_msg_az}
                      />
                    </div>
                  </div>
                  <div className="line-row">
                    <div className="column">
                      <StatusCard 
                        line="Verde"
                        status={result.verde}
                        message={result.tipo_msg_vd}
                      />
                    </div>
                    <div className="column">
                      <StatusCard 
                        line="Vermelha"
                        status={result.vermelha}
                        message={result.tipo_msg_vm}
                      />
                    </div>
                  </div>
              </div>}
            <Footer />

        </div>
    )
}

export default Home;