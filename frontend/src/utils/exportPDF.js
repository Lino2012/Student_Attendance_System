import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToPDF({ title, columns, rows, filename = 'report.pdf' }) {
  const doc = new jsPDF()
  doc.setFontSize(14)
  doc.text(title, 14, 16)
  autoTable(doc, {
    startY: 22,
    head: [columns],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: [188, 138, 84] },
  })
  doc.save(filename)
}