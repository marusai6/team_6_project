"use client"

import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    getPaginationRowModel,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/Table"
import React, { useState } from "react"
import { Button } from "../components/ui/Button"
import { UrlState, urlState } from "bi-internal/core"
import { cn } from "../lib/utils"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })


    // Updating Global State - TableData
    // useEffect(() => {
    //     const rows = getRowsForExport()
    //     if (rows.length) {
    //         const columns = generateColumsForExport(rows[0])
    //         dispatch(changeTableData({ rows, columns }))
    //     }

    // }, [sorting, columnFilters, columnVisibility, data])

    // function generateColumsForExport(object: object) {
    //     const columns = []
    //     for (const key of Object.keys(object)) {
    //         columns.push({ header: columnsHeadings.get(key), key, width: 30 })
    //     }
    //     return columns
    // }

    // function getRowsForExport() {
    //     const rows = []
    //     table.getRowModel().rows.map((row) => {
    //         let currentRow = {}
    //         row.getVisibleCells().map((cell) => {
    //             const context = cell.getContext()
    //             currentRow = { ...currentRow, [context.column.id]: context.getValue() }
    //         })
    //         rows.push(currentRow)
    //     })
    //     return rows
    // }

    return (
        <div className="space-y-4">

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => { urlState.updateModel({ employee: row.original["id"] }) }}
                                className={cn("cursor-pointer", UrlState.getModel().employee === row.original["id"] && 'bg-secondary hover:bg-secondary')}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Нет результатов
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between space-x-2 py-4">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Предыдущая страница
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Следующая страница
                </Button>
            </div>
        </div>
    )
}