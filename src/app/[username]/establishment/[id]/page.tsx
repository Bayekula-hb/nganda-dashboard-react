"use client";

import { 
  CSSProperties,useEffect, useState } from "react";
import NgandaValues from "../../../../config";
import BarLoader from 'react-spinners/BarLoader';
import HashLoader from "react-spinners/HashLoader";
import { InventoryDrinkList } from "@/components/inventoryDrinkList";
import { SaleProductEstablishmentList } from "@/components/saleProductEstablishmentList";
import { HistoricDrinkEstablishmentList } from "@/components/historicDrinkEstablishmentList";

export type EstablishmentType = {
    etablishment: {
      id: string
      nameEtablishment: string
      latitude: string
      longitude: string
      address: string
      pos: string
      numberPos: string
      workers: string
      workingDays: JSON
      isOnDemonstration: boolean
      isActive: number | boolean
      subscriptionExpiryDate: string
      settings: JSON
    }
    user: {
      id: string
      lastName: string
      firstName: string
      middleName: string
      userName: string
      gender: string
      phoneNumber: string
      email: string
    }
    workers: {
      id: string
      lastName: string
      firstName: string
      middleName: string
      userName: string
      gender: string
      phoneNumber: string
      email: string
    }[],
    inventoryDrinks: {
      id: string
      price: number
      quantity: number
      nameDrink: string
      imageDrink: string
      litrage: string
      typeDrink: string
    }[],
    sales : {
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
      total_amount_sold: number
    }[],
    historicInventoryDrinks : {
      historic_inventory_drinks_id: number
      historic_inventory_drinks_quantity: number
      historic_inventory_drinks_price: number
      historic_inventory_drinks_created_at: string
      historic_inventory_drinks_type_operator: string
      drink_id: number
      nameDrink: string
      typeDrink: string
      nameEtablishment: string
    }[],
    totalAmountSold: number

}


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#ffffff",
};

const Establishment = ({
    params
}: {
    params: { id: string },
}) => {
  
  const [isLoading, setIsLoading] =useState<boolean>(true);
  const [dataEstablishment, setDataEstablishment] = useState<EstablishmentType>();
    
  useEffect(()=> {
    const fetchData = async() =>{
      try {
            setIsLoading(true);
            const response = await fetch(`${NgandaValues.URL_API_REMOTE}admin/establishment/${params.id}`, {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token"),
              },
            });
            if (response.ok) { 
              const dataResponse = await response.json();
              setDataEstablishment(dataResponse.data);
              console.info(dataResponse.data);
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
   const workers: [] = dataEstablishment && dataEstablishment.etablishment ? JSON.parse(dataEstablishment.etablishment.workers) :  [];
   const inventoryDrinks = dataEstablishment && dataEstablishment.inventoryDrinks ? dataEstablishment.inventoryDrinks :  [];
   const sales = dataEstablishment && dataEstablishment.sales ? dataEstablishment.sales :  [];
   const historicDrinks = dataEstablishment && dataEstablishment.historicInventoryDrinks ? dataEstablishment.historicInventoryDrinks :  [];

    return(
        <div>
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
                <div>
                  <p className="text-lg">Etablissement : <span className="uppercase text-green-500 font-bold">{dataEstablishment?.etablishment.nameEtablishment}</span></p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-4 justify-between md:gap-2 border rounded shadow-lg p-4 mt-2 md:w-1/2 md:mt-4 md:p-4">
                      <div className="flex gap-2">
                        <span className="font-bold"> Adresse : </span> <span>{dataEstablishment?.etablishment.address}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold"> {"Nombre d'employes"} : </span>
                        {dataEstablishment && dataEstablishment.etablishment ? 
                          <span>
                            {JSON.parse(dataEstablishment.etablishment.workers).length}
                          </span>
                          :
                          <span>
                          </span>
                        }
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold"> {"Active"} : </span> <span>{dataEstablishment?.etablishment.isActive == 0 ? "Non" : "Oui" }</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold"> Latitude : </span> <span>{dataEstablishment?.etablishment.latitude}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold"> Longitude : </span> <span>{dataEstablishment?.etablishment.longitude}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4  gap-2 border rounded shadow-lg p-4 mt-2 md:w-1/2 md:mt-4 md:p-4">
                      <div>
                        <h4 className="text-lg font-semibold italic">Information du propriétaire</h4>
                      </div>
                      <div className="flex flex-col justify-between  gap-2">                        
                        <div className="flex gap-2">
                          <span className="font-bold"> Nom : </span> <span className="uppercase">{dataEstablishment?.user.lastName}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold"> Post-nom : </span> <span className="uppercase">{dataEstablishment?.user.middleName}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold"> Prenom : </span> <span className="uppercase">{dataEstablishment?.user.middleName}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold"> Téléphone : </span> <span className="uppercase">{dataEstablishment?.user.phoneNumber}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold"> Email : </span> <span className="">{dataEstablishment?.user.email}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold"> Sexe : </span> <span className="uppercase">{dataEstablishment?.user.gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div  className="w-full border shadow flex gap-2 items-center p-4 mt-4">
                    <h3 className="font-bold text-md sm:text-lg">Total Vendu :</h3>
                    <h3 className="font-bold text-md text-red-500 sm:text-lg"> {dataEstablishment?.totalAmountSold ?? 0} Fc </h3>
                  </div>

                  <div className="my-2">
                    <SaleProductEstablishmentList saleProducts={sales} />
                  </div>
                  <div className="my-2">
                    <InventoryDrinkList data={inventoryDrinks} />
                  </div>
                  <div className="my-2">
                    <HistoricDrinkEstablishmentList historicDrink={historicDrinks} />
                  </div>
                </div>
            }
        </div>
    )
}
export default Establishment;