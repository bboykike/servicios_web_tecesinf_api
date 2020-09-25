import axios from 'axios';


export default axios.create({
  baseURL: "http://localhost:55486/api/"
});