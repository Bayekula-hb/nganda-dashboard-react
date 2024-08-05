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

export type Establishment = {
  id: string
  nameEtablishment: string
  latitude: string
  longitude: string
  address: string
  pos: string
  numberPos: string
  workers: JSON
  workingDays: JSON
  isOnDemonstration: boolean
  isActive: boolean
  subscriptionExpiryDate: string
  settings: JSON
}

export const columns: ColumnDef<Establishment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "nameEtablishment",
    header: "Nom de l'établissement",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nameEtablishment")}</div>
    ),
  },
  // {
  //   accessorKey: "latitude",
  //   header: "Latitude",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("latitude")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "longitude",
  //   header: "Longitude",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("longitude")}</div>
  //   ),
  // },
  {
    accessorKey: "address",
    header: "Adresse",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "workers",
    header: "Nombre de travailleurs",
    cell: ({ row }) => {
      const workers: number = JSON.parse(row.getValue("workers")).length;
      return <div className="capitalize">{workers}</div>
    },
  },
  {
    accessorKey: "isOnDemonstration",
    header: "Demonstration",
    cell: ({ row }) => {
      const mode = row.getValue("isOnDemonstration") == 1 || "true" ? "Vrai" : "Faux";
      return <div className="capitalize">{mode}</div>
    },
  },
  {
    accessorKey: "isActive",
    header: "Activé",
    cell: ({ row }) => {
      return <div className="capitalize">
        {
          row.getValue("isActive") === 0  ?
          <span className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"/></svg>
          </span>
          : row.getValue("isActive") === 1 ?
            <span className="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m.5 8.55l2.73 3.51a1 1 0 0 0 .78.39a1 1 0 0 0 .78-.36L13.5 1.55"/></svg>
            </span>
          : ""
        }
      </div>
    },
  },
  {
    accessorKey: "subscriptionExpiryDate",
    header: "Date du fin d'abonnement",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subscriptionExpiryDate")}</div>
    ),
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const establishment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="w-full font-bold uppercase flex items-center text-center border-b-2">Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(establishment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className="w-full flex gap-3 justify-left text-blue-500"
                href={`establishment/${establishment.id}`}
              >
                <span>Voir</span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
                </span>
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function EstablishmentList() {

  
  const [isLoading, setIsLoading] =useState<boolean>(true);
  const [dataEstablishment, setDataEstablishment] = useState<Establishment[]>([]);

  useEffect(()=> {
    const fetchData = async() =>{
      try {
            setIsLoading(true);
            const response = await fetch(`${NgandaValues.URL_API_REMOTE}admin/establishments/0`, {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token"),
              },
            });
            if (response.ok) { 
              const dataResponse = await response.json();
              setDataEstablishment(dataResponse.data.data);
              setIsLoading(false);
            }  else {
              console.error('Erreur lors de la récupération des données');
            }
      
      } catch (error) {          
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
    fetchData();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: dataEstablishment,
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
    {isLoading ?
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
                    {/* <Input
                      placeholder="Filter emails..."
                      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                      onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                      }
                      className="max-w-sm"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                          Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => {
                            return (
                              <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                  column.toggleVisibility(!!value)
                                }
                              >
                                {column.id}
                              </DropdownMenuCheckboxItem>
                            )
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                  <div  className="flex items-center pb-8 pt-2">
                    <h2 className="font-bold text-lg">
                      Tableau des établissements
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
      }
    </>
  )
}