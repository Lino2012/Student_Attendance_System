import * as XLSX from 'xlsx'

export function exportToExcel({ columns, rows, filename = 'report.xlsx', sheetName = 'Report' }) {
  const data = [columns, ...rows]
  const worksheet = XLSX.utils.aoa_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  XLSX.writeFile(workbook, filename)
}