// import React from 'react'
// import { Button } from './ui/Button'
// import { Download } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../state/store'

// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';

// const ExportToSLSXButton = () => {

//      const tableData = useSelector((state: RootState) => state.tableData)

//     async function downloadXlsx() {
//         const workbook = new ExcelJS.Workbook()
//         const worksheet = workbook.addWorksheet('Sheet 1')

//         worksheet.columns = tableData.columns
//         worksheet.addRows(tableData.rows)

//         // Генерация XLSX файла в качестве блоба
//         const buffer = await workbook.xlsx.writeBuffer()
//         const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

//         // Загрузка файла
//         saveAs(blob, 'employeeData.xlsx')
//     }


//     return (
//         <Button variant={'outline'} size='icon' className='shrink-0' onClick={downloadXlsx}>
//             <Download size={18} />
//         </Button>
//     )
// }

// export default ExportToSLSXButton