"use client"

import {  CSSProperties } from "react";
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NgandaValues from "@/config";
import { useState, useEffect } from "react"
import Link from "next/link";
import HashLoader from "react-spinners/HashLoader";



const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#ffffff",
};
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type HistoricDrink = {
  historic_inventory_drinks_id: number
  historic_inventory_drinks_quantity: number
  historic_inventory_drinks_price: number
  historic_inventory_drinks_created_at: string
  historic_inventory_drinks_type_operator: string
  drink_id: number
  nameDrink: string
  typeDrink: string
  nameEtablishment: string
}

export const columns: ColumnDef<HistoricDrink>[] = [

  {
    accessorKey: "historic_inventory_drinks_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("historic_inventory_drinks_id")}</div>
    ),
  },
  {
    accessorKey: "nameDrink",
    header: "Boisson",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nameDrink")}</div>
    ),
  },
  {
    accessorKey: "typeDrink",
    header: "Adresse",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("typeDrink")}</div>
    ),
  },
  {
    accessorKey: "nameEtablishment",
    header: "Etablissement",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nameEtablishment")}</div>
    ),
  },
  {
    accessorKey: "historic_inventory_drinks_quantity",
    header: "Quantité",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("historic_inventory_drinks_quantity")}</div>
    ),
  },
  {
    accessorKey: "historic_inventory_drinks_type_operator",
    header: "Type d'opération",
    cell: ({ row }) => {
      const type_operator = row.getValue("historic_inventory_drinks_type_operator") == "output" ? "Sortie" : "Entrée";
      return <div className="capitalize">{type_operator}</div>
    },
  },
  {
    accessorKey: "historic_inventory_drinks_created_at",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("historic_inventory_drinks_created_at")}</div>
    ),
  },
]

export function HistoricDrinkEstablishmentList({ historicDrink } : { historicDrink : HistoricDrink[]}) {

  const [dataDrink, setDataDrink] = useState<HistoricDrink[]>(historicDrink);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: dataDrink,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>
    {/* {isLoading ?
                <>
                  <div className="min-h-[80vh] flex items-center justify-center p-16">
                      <div className=" ">                          
                        <HashLoader
                            color="#2563EB"
                            loading={isLoading}
                            cssOverride={override}
                            size={80}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                      </div>
                  </div>
                  <div className="z-[3000] bg-primary"></div>
                </>
                :
                <div className="w-full border shadow p-4">
                  <div className="flex items-center py-0">
                  </div>
                  <div  className="flex items-center pb-8 pt-2">
                    <h2 className="font-bold text-lg">
                      {"Tableau des opérations d'entrée-sortie"}
                    </h2>
                  </div>
                  <div className="rounded-md border">
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
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                            >
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="space-x-2">
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        Précédent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                </div>
    } */}
    
      <div className="w-full border shadow p-4">
        <div className="flex items-center py-0">
        </div>
        <div  className="flex items-center pb-8 pt-2">
          <h2 className="font-bold text-lg">
            {"Tableau des opérations d'entrée-sortie"}
          </h2>
        </div>
        <div className="rounded-md border">
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline" 
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}