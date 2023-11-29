import axios from 'axios'
import type {} from 'types'

export default function getCommits() {
  return axios.get('http://localhost:3000/commits').then(res => res.data)
}
