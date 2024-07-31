import React from 'react'
import { Download } from 'lucide-react'
import { useSelector } from 'react-redux'

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { RootState } from '../../state/store';
import { Button } from '../ui/Button';

const ExportToSLSXButton = ({ exportData }: { exportData: { id: number, name: string, title: string, department: string, city: string, email: string }[] }) => {

    async function downloadXlsx() {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Sheet 1')

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 16 },
            { header: 'Имя', key: 'name', width: 32 },
            { header: 'Почта', key: 'email', width: 50 },
            { header: 'Подразделение', key: 'department', width: 50 },
            { header: 'Должность', key: 'title', width: 50 },
            { header: 'Город', key: 'city', width: 30 },
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