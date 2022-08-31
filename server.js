const express = require("express");
const axios = require('axios');
const path = require('path')
require('dotenv').config();

const app = express();

const token = process.env.API_KEY;
const base_url = "https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1";


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.get("/api/hello", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/api/estadoServico", (req, res) => {
    console.log("Getting estadoServico");
    //fetch waiting times for the selected line from the API
    var response = axios.get(`${base_url}/estadoLinha/todos`, { headers: { Authorization: `Bearer ${token}`}})
        .then(response => { return response.data.resposta || [] })
        .catch(error => { return error });

    response.then(function(result) {
        console.log("sending: ");
        console.log(result);
        res.status(200).send(result);
    })
});

app.post("/api/tempos", (req, res) => {
    const linha = req.body.linha;
    //fetch waiting times for the selected line from the API
    var response = axios.get(`${base_url}/tempoEspera/Linha/${linha}`, { headers: { Authorization: `Bearer ${token}`}})
        .then(response => { return response.data.resposta || [] })
        .catch(error => { return error });
    
    response.then(function(result) {
        //parse date
        var date = result[0].hora.slice(8,10) + 'h' + result[0].hora.slice(10,12) + ' ' + result[0].hora.slice(6,8) + '-' + result[0].hora.slice(4,6) + '-' + result[0].hora.slice(0,4);
        var estacoes = [];
        for (let i = 0; i < result.length; i++) {
            var toPush;
            
            switch (linha) {
                case "Amarela":
                    toPush = parseYellowLine(result[i], estacoes);
                    break;
                case "Azul":
                    toPush = parseBlueLine(result[i], estacoes);
                    break;
                case "Vermelha":
                    toPush = parseRedLine(result[i], estacoes);
                    break;
                case "Verde":
                    toPush = parseGreenLine(result[i], estacoes);
                    break;
                default:
                    break;
            }
            if(toPush!== 0){estacoes.push(toPush);}
        }
        estacoes.sort(getSortOrder('estacao'));
        res.status(200).send({data: estacoes, date: date, line:linha});
    })
});



app.listen(process.env.PORT || 5000, () => console.log(`listening on port ${process.env.PORT || 5000}`));

/**
 * 
 * @param {*} data 
 * @returns 
 */
 function parseYellowLine(data, estacoes) {
    var estacao = "";
    var destino = "";
    var chegada1 = secToMinStr(data.tempoChegada1);
    var chegada2 = secToMinStr(data.tempoChegada2);
    var chegada3 = secToMinStr(data.tempoChegada3);
    
    if(data.destino === "43") { destino = "Odivelas"; }
    else { destino = "Rato"; }
    
    switch (data.stop_id) {
        case "OD":
            estacao = "Odivelas";
            break;
        case "RA":
            estacao = "Rato";
            break;
        case "MP":
            estacao = "Marquês de Pombal";
            break;           
        case "SR":
            estacao = "Senhor Roubado";
            break;
        case "AX":
            estacao = "Ameixoeira";
            break;
        case "LU":
            estacao = "Lumiar";
            break;
        case "PI":
            estacao = "Picoas";
            break;
        case "SA":
            estacao = "Saldanha";
            break;
        case "CP":
            estacao = "Campo Pequeno";
            break;
        case "QC":
            estacao = "Quinta das Conchas";
            break;
        case "EC":
            estacao = "Entrecampos";
            break;
        case "CU":
            estacao = "Cidade Universitária";
            break;
        case "CG":
            estacao = "Campo Grande";
            break;
        default:
            break;
    }

    if(estacoes.some(e => e.estacao === estacao && e.destino === destino)) {
        console.log("Already exists.");
        return 0;
    } else if (estacao === destino) {
        return 0;
    }


    return {
        estacao: estacao,
        destino: destino,
        chegada1: chegada1,
        chegadas_seguintes: chegada2 + ", " + chegada3
    }

}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function parseBlueLine(data, estacoes) {
    var estacao = "";
    var destino = "";
    var chegada1 = secToMinStr(data.tempoChegada1);
    var chegada2 = secToMinStr(data.tempoChegada2);
    var chegada3 = secToMinStr(data.tempoChegada3);
    
    if(data.destino === "33") { destino = "Reboleira"; }
    else { destino = "Santa Apolónia"; }
    
    switch (data.stop_id) {
        case "SP":
            estacao = "Santa Apolónia";
            break;
        case "RB":
            estacao = "Reboleira";
            break;
        case "MP":
            estacao = "Marquês de Pombal";
            break;           
        case "TP":
            estacao = "Terreiro do Paço";
            break;
        case "AS":
            estacao = "Amadora Este";
            break;
        case "BC":
            estacao = "Baixa Chiado";
            break;
        case "AF":
            estacao = "Alfornelos";
            break;
        case "RE":
            estacao = "Rossio";
            break;
        case "PO":
            estacao = "Pontinha";
            break;
        case "CA":
            estacao = "Carnide";
            break;
        case "AV":
            estacao = "Avenida";
            break;
        case "CM":
            estacao = "Colégio Militar/Luz";
            break;
        case "AH":
            estacao = "Alto dos Moinhos";
            break;
        case "PA":
            estacao = "Parque";
            break;
        case "LA":
            estacao = "Laranjeiras";
            break;
        case "SS":
            estacao = "São Sebastião";
            break;
        case "JZ":
            estacao = "Jardim Zoológico";
            break;
        case "PE":
            estacao = "Praça de Espanha";
            break;
        default:
            break;
    }

    if(estacoes.some(e => e.estacao === estacao && e.destino === destino)) {
        console.log("Already exists");
        return 0;
    } else if (estacao === destino) {
        return 0;
    }


    return {
        estacao: estacao,
        destino: destino,
        chegada1: chegada1,
        chegadas_seguintes: chegada2 + ", " + chegada3
    }
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function parseGreenLine(data, estacoes) {
    var estacao = "";
    var destino = "";
    var chegada1 = secToMinStr(data.tempoChegada1);
    var chegada2 = secToMinStr(data.tempoChegada2);
    var chegada3 = secToMinStr(data.tempoChegada3);
    
    if(data.destino === "50") { destino = "Cais do Sodré"; }
    else { destino = "Telheiras"; }
    
    switch (data.stop_id) {
        case "TE":
            estacao = "Telheiras";
            break;
        case "CS":
            estacao = "Cais do Sodré";
            break;
        case "CG":
            estacao = "Campo Grande";
            break;           
        case "BC":
            estacao = "Baixa Chiado";
            break;
        case "RO":
            estacao = "Rossio";
            break;
        case "AL":
            estacao = "Alvalade";
            break;
        case "MM":
            estacao = "Martim Moniz";
            break;
        case "RM":
            estacao = "Roma";
            break;
        case "IN":
            estacao = "Intendente";
            break;
        case "AE":
            estacao = "Areeiro";
            break;
        case "AN":
            estacao = "Anjos";
            break;
        case "AM":
            estacao = "Alameda";
            break;
        case "AR":
            estacao = "Arroios";
            break;
        default:
            break;
    }

    if(estacoes.some(e => e.estacao === estacao && e.destino === destino)) {
        console.log("Already exists");
        return 0;
    } else if (estacao === destino) {
        return 0;
    }


    return {
        estacao: estacao,
        destino: destino,
        chegada1: chegada1,
        chegadas_seguintes: chegada2 + ", " + chegada3
    }
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function parseRedLine(data, estacoes) {
    var estacao = "";
    var destino = "";
    var chegada1 = secToMinStr(data.tempoChegada1);
    var chegada2 = secToMinStr(data.tempoChegada2);
    var chegada3 = secToMinStr(data.tempoChegada3);
    
    if(data.destino === "38") { destino = "São Sebastião"; }
    else { destino = "Aeroporto"; }
    
    switch (data.stop_id) {
        case "AP":
            estacao = "Aeroporto";
            break;
        case "EN":
            estacao = "Encarnação";
            break;
        case "SA":
            estacao = "Saldanha";
            break;           
        case "AM":
            estacao = "Alameda";
            break;
        case "MO":
            estacao = "Moscavide";
            break;
        case "OR":
            estacao = "Oriente";
            break;
        case "OL":
            estacao = "Olaias";
            break;
        case "CR":
            estacao = "Cabo Ruivo";
            break;
        case "BV":
            estacao = "Bela Vista";
            break;
        case "OS":
            estacao = "Olivais";
            break;
        case "CH":
            estacao = "Chelas";
            break;
        case "SS":
            estacao = "São Sebastião";
            break;
        default:
            break;
    }

    if(estacoes.some(e => e.estacao === estacao && e.destino === destino)) {
        console.log("Already exists.");
        return 0;
    } else if (estacao === destino) {
        return 0;
    }

    return {
        estacao: estacao,
        destino: destino,
        chegada1: chegada1,
        chegadas_seguintes: chegada2 + ", " + chegada3
    }
}

/**
 * 
 * @param {*} time 
 * @returns 
 */
function secToMinStr(time) {
    //function that given the number of seconds, returns the string with the minutes and seconds
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return minutes + "m" + seconds + "s";
}

function getSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}