import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ExportarPdf = ({ colaboradores, onSetPDF }) => {
  const exportDone = React.useRef(false)

  React.useEffect(() => {
    if (!exportDone.current) {
      // Coluna a ser removida
      const colunaParaRemover = ['endereco', 'estado', 'is_ativo']

      const headers = Object.keys(colaboradores[0])
        .filter((key) => !colunaParaRemover.includes(key))
        .map((key) => {
          if (key === 'is_ativo') {
            return 'ATIVO'
          }
          return key.toUpperCase()
        })

      // Crie a tabela com base nos dados dos colaboradores
      const rows = colaboradores.map((colaborador) =>
        headers.map((header) => {
          if (header === 'ATIVO') {
            return colaborador['is_ativo'] ? 'SIM' : 'NÃO'
          } else if (header === 'LOCALSITE') {
            return colaborador.localsite.nome
          }
          return colaborador[header.toLowerCase()]
        })
      )
      // Crie uma instância do jsPDF
      const doc = new jsPDF({
        orientation: 'landscape', // Configurando a orientação para paisagem
      })

      // Adicione um título à tabela
      const titulo = 'Lista de Colaboradores'
      const larguraDocumento = doc.internal.pageSize.getWidth()
      const larguraTitulo = (doc.getStringUnitWidth(titulo) * doc.internal.getFontSize()) / doc.internal.scaleFactor
      const posicaoHorizontal = (larguraDocumento - larguraTitulo) / 2
      doc.text(titulo, posicaoHorizontal, 10)

      // Adicione a tabela ao PDF
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 20, // Posição inicial da tabela em relação ao topo da página
      })

      // Baixe o PDF
      doc.save('colaboradores.pdf')

      // Informe ao componente pai que o PDF foi exportado
      onSetPDF(false)
      exportDone.current = true
    }
  }, [onSetPDF, colaboradores])

  return <></>
}

export default ExportarPdf
