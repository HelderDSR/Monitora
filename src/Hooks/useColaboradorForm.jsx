import React from 'react'

const validacao = {
  nome: {
    regex: /^[a-zA-Z\s]+$/,
    message: 'Somente letras são permitidas.',
  },
  login: {
    regex: /^[a-zA-Z]+$/,
    message: 'Somente letras são permitidas. Ex.: mapfrebr',
  },
  senha: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=_!]{8,}$/,
    // regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=_!])[A-Za-z\d@#$%^&+=_!]{8,}$/,
    message: 'Senha deve ter: Ao menos 1 letra, 1 digito e 8 caracter de letras ou digitos.',
  },
  cpf: {
    regex: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})|([0-9]{11})$/,
    message: 'Formato inválido para CPF. ex.: 123.456.789-09',
  },
  rg: {
    regex: /^\d{2}\.\d{3}\.\d{3}-\d{1}$/,
    message: 'Formato inválido para RG. ex.: 00.000.000-0',
  },
  cep: {
    regex: /^[0-9]{5}-[0-9]{3}$/,
    message: 'Formato inválido para CEP. ex.: 12345-678',
  },
  estado: {
    regex: /^[a-zA-Z]{2}$/,
    message: 'Somente sigla é permitido: ex.: SP ou MG',
  },
  endereco: {
    regex: /^[a-zA-Z\s]+$/,
    message: 'Somente texto é permitido: ex.: Rua das Alamedas......',
  },
  bairro: {
    regex: /^[a-zA-Z\s]+$/,
    message: 'Somente texto é permitido: ex.:Jardim dos Deuses.',
  },
  numero: {
    regex: /^[1-9]\d*$/,
    message: 'Somente números são permitidos. Ex.: 123',
  },
  cnpj: {
    regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    message: 'Formato inválido. Ex.: 12.345.678/0001-90',
  },
  cidade: {
    regex: /^[a-zA-Záàâãéèêíïóôõöúçñ\s]+$/,
    message: 'Somente texto é permitido: ex.:São Carlos.',
  },
  telefone: {
    regex: /^\(\d{2}\)\d{4,5}-\d{4}$/,
    message: 'Formato de telefone inválido. Ex.: (16)9999-9999 com 4 ou 5 digito antes do hifen',
  },
  gestor: {
    regex: /^[a-zA-Z\s]+$/,
    message: 'Somente texto é permitido. Ex.: Carlos da Silva',
  },
  setor: {
    regex: /^[a-zA-Z\s]+$/,
    message: 'Somente texto é permitido. Ex.: Vendas',
  },
  selecionar: {
    regex: /^[1-9]\d*$/, // Permite apenas números inteiros positivos
    message: 'Selecione o Local Site.',
  },
  relacao: {
    regex: /^[a-zA-Záàâãéèêíïóôõöúçñ\s]+$/,
    message: 'Somente texto é permitido. Ex.: Funcionário',
  },
}

const useColaboradorForm = (type) => {
  const [value, setValor] = React.useState('')
  const [error, setError] = React.useState(null)

  function validate(value) {
    if (type === false) return true
    if (value.length === 0) {
      setError('Preencha um valor.')
      return false
    } else if (validacao[type] && !validacao[type].regex.test(value)) {
      setError(validacao[type].message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value)
    setValor(target.value)
  }

  return {
    value,
    setValor,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useColaboradorForm
