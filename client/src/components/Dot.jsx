import React from "react";

function Dot(props){
    let dotClass = "";
    if(props.status === " Ok"){
        dotClass = "dot green";
    } else if(props.status === " Alerta"){
        dotClass = "dot orange";
    } else if(props.status === " Interrompida"){
        dotClass = "dot red";
    }
    return (
        <div className={dotClass}></div>
    )
}

export default Dot;