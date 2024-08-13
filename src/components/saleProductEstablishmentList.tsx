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

export type Sale = {
  sale_id: number
  sale_quantity: number
  establishment_id: number
  nameEtablishment: string
  sale_created_at: string
  nameDrink: string
  drink_id: number
  drink_price: number
  typeDrink: string
  inventory_drink_id: number
}

export const columns: ColumnDef<Sale>[] = [

  {
    accessorKey: "sale_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sale_id")}</div>
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
    header: "Type Boisson",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("typeDrink")}</div>
    ),
  },
  {
    accessorKey: "drink_price",
    header: "Prix",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("drink_price")}</div>
    ),
  },
  {
    accessorKey: "sale_quantity",
    header: "Quantite",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sale_quantity")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total payé",
    cell: ({ row }) => {
      const drink_price: number = row.original.drink_price;
      const sale_quantity: number = row.original.sale_quantity;
      return <div className="capitalize">{sale_quantity * drink_price} Fc</div>
    },
  },
  {
    accessorKey: "sale_created_at",
    header: "Date de vente",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sale_created_at")}</div>
    ),
  },
]

export function SaleProductEstablishmentList({ saleProducts } : { saleProducts : Sale[]}) {

  
  const [dataSale, setDataSale] = useState<Sale[]>(saleProducts);

  // useEffect(()=> {
  //   const fetchData = async() =>{
  //     try {
  //           setIsLoading(true);
  //           const response = await fetch(`${NgandaValues.URL_API_REMOTE}admin/establishments/0`, {
  //             method: 'GET',
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "Authorization": "Bearer " + localStorage.getItem("token"),
  //             },
  //           });
  //           if (response.ok) { 
  //             const dataResponse = await response.json();
  //             setDataSale(dataResponse.data.data);
  //             setIsLoading(false);
  //           }  else {
  //             console.error('Erreur lors de la récupération des données');
  //           }
      
  //     } catch (error) {          
  //       console.error('Erreur lors de la récupération des données :', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: dataSale,
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
      <div className="w-full border shadow p-4">
        <div className="flex items-center py-0">
        </div>
        <div  className="flex items-center pb-8 pt-2">
          <h2 className="font-bold text-lg">
            Tableau des ventes
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