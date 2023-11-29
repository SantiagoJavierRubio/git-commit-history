import axios from 'axios'
export default function getCommits() {
  return axios.get('http://localhost:3000/commits').then(res => res.data)
}
