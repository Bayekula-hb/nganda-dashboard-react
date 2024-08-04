"use client";

import { useEffect, useState } from "react";
import NgandaValues from "../../../../../../src/config";
import BarLoader from 'react-spinners/BarLoader';

export type EstablishmentType = {
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
            const response = await fetch(`${NgandaValues.URL_API_LOCAL}admin/establishment/${params.id}`, {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token"),
              },
            });
            if (response.ok) { 
              const dataResponse = await response.json();
              setDataEstablishment(dataResponse.data);
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

    return(
        <div>
            {isLoading ?
                
                <>
                    <div className="fixed inset-0 z-[500] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <div className=" ">
                        <BarLoader
                            height="105"
                            width="105"
                            color="#CA0B4A"
                            // ariaLabel="loading"
                        />
                        </div>{" "}
                    </div>
                    <div className="fixed inset-0 z-40 bg-primary"></div>
                </>
                :
                <div>
                    <p className="text-lg">Etablissement : <span className="uppercase text-green-500 font-bold">{dataEstablishment?.nameEtablishment}</span></p>

                </div>
            }
        </div>
    )
}
export default Establishment;