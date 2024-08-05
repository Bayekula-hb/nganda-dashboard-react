"use client";

import { useEffect, useState } from "react";
import NgandaValues from "../../../../config";
import BarLoader from 'react-spinners/BarLoader';

export type EstablishmentType = {
    etablishment: {
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
                    <div className="h-full flex items-center justify-center p-16">
                        <div className=" ">
                          <BarLoader
                              height="105"
                              width="105"
                              color="#CA0B4A"
                              // ariaLabel="loading"
                          />
                        </div>{" "}
                    </div>
                    <div className="z-[3000] bg-primary"></div>
                </>
                :
                <div>
                  <p className="text-lg">Etablissement : <span className="uppercase text-green-500 font-bold">{dataEstablishment?.etablishment.nameEtablishment}</span></p>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-4 justify-between  gap-2 border rounded shadow-lg w-1/2 mt-4 p-4">
                      <div className="flex gap-2">
                        <span className="font-bold"> Adresse : </span> <span>{dataEstablishment?.etablishment.address}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold"> {"Nombre d'employes"} : </span> <span>{JSON.parse(dataEstablishment?.etablishment.workers).length}</span>
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
                    <div className="flex flex-col gap-4  gap-2 border rounded shadow-lg w-1/2 mt-4 p-4">
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
                </div>
            }
        </div>
    )
}
export default Establishment;