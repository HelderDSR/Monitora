import { api } from '../../Api'

export const getColaboradores = async (sort = 'nome', page = 1) => {
  try {
    let url = `/colaborador?sort=${sort}&page=${page}`
    return api.get(url)
  } catch (error) {
    console.log(error)
  }
}
export const showColaborador = async (filtro) => {
  try {
    let url = `/colaborador?${filtro}`
    return api.get(url)
  } catch (error) {
    console.log(error)
  }
}
export const colaboradorShow = async (login) => {
  try {
    let url = `/colaborador/${login}`
    return api.get(url)
  } catch (error) {
    console.log(error)
  }
}

export const createColaborador = async (idSite, colaborador) => {
  let url = `/colaborador/${idSite}/colaborador`
  return api.post(url, colaborador)
}

export const updateColaborador = async (colaborador, idColaborador) => {
  try {
    let url = `/colaborador/${idColaborador}`
    return api.put(url, colaborador)
  } catch (error) {
    console.log(error)
  }
}
