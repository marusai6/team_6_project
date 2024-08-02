import React from 'react'
import { Download } from 'lucide-react'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from '../ui/Button';
import { Employee } from '../../employees/columns';

const ExportToSLSXButton = ({ exportData }: { exportData: Employee[] }) => {

    async function downloadXlsx() {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Sheet 1')

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 16 },
            { header: 'Имя', key: 'name', width: 32 },
            { header: 'Почта', key: 'email', width: 50 },
        ]
        worksheet.addRows(exportData)

        // Генерация XLSX файла в качестве блоба
        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

        // Загрузка файла
        saveAs(blob, 'employeeData.xlsx')
    }


    return (
        <Button variant={'outline'} className='shrink-0 size-10' onClick={downloadXlsx}>
            <Download size={20} />
        </Button>
    )
}

export default ExportToSLSXButton