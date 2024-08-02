import React from "react"
import { Employee, columns } from "./columns"
import { DataTable } from "./data-table"


export default function EmployeeTable({ employeeData }: { employeeData: Employee[] }) {

    return (
        <div className="w-full">
            <DataTable columns={columns} data={employeeData} />
        </div>
    )
}
