"use client";

import { EstablishmentList } from "@/components/establishmentList"
import { useEffect, useState } from "react"
import NgandaValues from "@/config";


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


const Dashboard = ({
    params
  }: Readonly<{
    params: { userName: string }
  }>) => {

    return(
        <div>
          <EstablishmentList />
        </div>
    )
}
export default Dashboard