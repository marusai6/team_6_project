"use client"

import React from "react"
import { Button } from "../components/ui/Button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Employee = {
    "User ID": string
    подразделения: string
    должность: string
}

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "User ID",
        header: ({ column }) => <FilterHeader column={column} title={'ID'} />,
    },
    {
        accessorKey: "должность",
        header: ({ column }) => <FilterHeader column={column} title={'Должность'} />,
    },
    {
        accessorKey: "подразделения",
        header: ({ column }) => <FilterHeader column={column} title={'Подразделение'} />,
    },
]

const FilterHeader = ({ column, title }) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}