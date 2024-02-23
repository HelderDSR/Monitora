import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_PROTOCOLO}://${process.env.REACT_APP_HOST_SERVER}:${process.env.REACT_APP_PORTA_SERVER}`,
})
