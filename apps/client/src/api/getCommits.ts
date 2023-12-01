import axios from "axios";

const serverPort = import.meta.env.SERVER_PORT;

export default function getCommits() {
  return axios
    .get(`http://localhost:${serverPort}/commits`)
    .then((res) => res.data);
}
