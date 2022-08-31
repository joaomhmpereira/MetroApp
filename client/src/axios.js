import axios from "axios";  //imports axios

const instance = axios.create({
 baseURL: "https://metroproject.herokuapp.com/",
});

export default instance;  //exports the instance