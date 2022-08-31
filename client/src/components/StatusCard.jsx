import React from "react";
import { useNavigate } from 'react-router-dom';
import Dot from "./Dot";

function StatusCard(props){
    const navigate = useNavigate();
    var imgURL = "";

    switch(props.line){
        case "Vermelha":
            imgURL = "linha_vermelha_logo.png";
            break;
        case "Amarela":
            imgURL = "linha_amarela_logo.png";
            break;
        case "Azul":
            imgURL = "linha_azul_logo.png";
            break;
        case "Verde":
            imgURL = "linha_verde_logo.png";
            break;
        default:
            break;
    }

    function handleClick(){
        navigate('/tempos', {state: {linha: props.line}});
    }
    
    return (
        <div className="status-card " id={props.line}>
            <h1 className="display-5 lh-1 mt-4">Linha: <strong>{props.line}</strong></h1>
            <div className="status-bar">
                <p className="lead">Estado: {props.status}</p>
                <Dot
                    status={props.status}
                />
                {(props.line === "Verde" || props.line === "Amarela") && <img src={imgURL} alt="Linha" width="69" className="img-fluid amarela-verde"/>}
                {(props.line === "Vermelha" || props.line === "Azul") && <img src={imgURL} alt="Linha" width="100" className="img-fluid"/>}
            </div>
            {props.status !== " Interrompida" && <button type="button" value={props.line} onClick={handleClick} className="btn btn-outline-dark">Obter tempos</button>}
            {props.status !== " Ok" && <p className="lead">Aviso: {props.message}</p>}

        </div>
    )
}

export default StatusCard;