import React from 'react'
import * as XLSX from 'xlsx'

const ExportarXLSX = ({ colaboradores, onSetXLSX }) => {
  const exportDone = React.useRef(false)

  React.useEffect(() => {
    if (!exportDone.current) {
      // Função para exportar dados para Excel
      const headers = Object.keys(colaboradores[0]).map((key) => {
        if (key === 'is_ativo') {
          return 'ATIVO'
        }
        return key.toUpperCase()
      })

      const dados = colaboradores.map((colaborador) =>
        headers.map((header) => {
          if (header === 'ATIVO') {
            return {
              [header]: colaborador['is_ativo'] ? 'SIM' : 'NÃo',
            }
          } else if (header === 'LOCALSITE') {
            return {
              [header]: colaborador.localsite.nome,
            }
          }
          return {
            [header]: colaborador[header.toLowerCase()],
          }
        })
      )

      function flattenData(data) {
        // estou recebendo um  array de arrays, precio converter subarray para array de objeto antes de usar na função json_to_sheet
        return data.map((row) => {
          const obj = {}
          row.forEach((cell) => {
            // Mapeia cada chave-valor do objeto para uma coluna na linha
            Object.keys(cell).forEach((key) => {
              obj[key] = cell[key]
            })
          })
          return obj
        })
      }

      function exportToExcel(data, fileName, sheetName) {
        const flatternetData = flattenData(data)
        // Cria a planilha e salva o arquivo
        const ws = XLSX.utils.json_to_sheet(flatternetData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet 1')
        XLSX.writeFile(wb, fileName || 'exported-data.xlsx')
      }

      exportToExcel(dados, 'colaboradores.xlsx')
      exportDone.current = true
      onSetXLSX(false)
    }
  }, [onSetXLSX, colaboradores])
  return <></>
}

export default ExportarXLSX
