"use client";

import { EstablishmentList } from "@/components/establishmentList"
import { useEffect, useState } from "react"
import NgandaValues from "@/config";
import CardDash from "@/components/CardDash";


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

export type Statistics = {
  etablishments: number
  users: number
  sales: number
  drinks: number
}


const Dashboard = ({
    params
  }: Readonly<{
    params: { userName: string }
  }>) => {
    const [data, setData] = useState<Statistics>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

      const fetchData = async() =>{
        try {
              setIsLoading(true);
              const response = await fetch(`${NgandaValues.URL_API_LOCAL}admin/statistics`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
              });
              if (response.ok) { 
                const dataResponse = await response.json();
                setData(dataResponse.data);
                setIsLoading(false);
              }  else {
                console.error('Erreur lors de la récupération des données');
              }
        
        } catch (error) {          
          console.error('Erreur lors de la récupération des données :', error);
        }
      }
      fetchData();
    }, [params.userName]);
    
    const listCardElements = [
      {
          cardColor : "bg-gray-200",
          cardIcon : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><mask id="letsIconsDrink0" fill="#fff"><path d="M5 9.286c0-.266 0-.399.025-.509a1 1 0 0 1 .752-.752C5.887 8 6.02 8 6.286 8h11.428c.266 0 .399 0 .509.025a1 1 0 0 1 .752.752c.025.11.025.243.025.509V10c0 .929 0 1.393-.051 1.783a6 6 0 0 1-5.166 5.166C13.393 17 12.93 17 12 17c-.929 0-1.393 0-1.783-.051a6 6 0 0 1-5.166-5.166C5 11.393 5 10.93 5 10z"/></mask><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 21h6m-3 0v-5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M5 9.286c0-.266 0-.399.025-.509a1 1 0 0 1 .752-.752C5.887 8 6.02 8 6.286 8h11.428c.266 0 .399 0 .509.025a1 1 0 0 1 .752.752c.025.11.025.243.025.509V10c0 .929 0 1.393-.051 1.783a6 6 0 0 1-5.166 5.166C13.393 17 12.93 17 12 17c-.929 0-1.393 0-1.783-.051a6 6 0 0 1-5.166-5.166C5 11.393 5 10.93 5 10z" mask="url(#letsIconsDrink0)"/><path fill="currentColor" d="M11.039 11.725a1 1 0 1 0 1.922.55zm2.691-5.782l.962.275zm1.18-1.307l-.37-.929zm-.825.44l.742.67zm-1.124 7.199l1.731-6.057l-1.923-.55l-1.73 6.057zm2.321-6.71l4.09-1.637l-.743-1.856l-4.09 1.635zm-.59.653c.07-.248.107-.373.14-.46c.027-.07.028-.048-.005-.012l-1.485-1.34c-.347.385-.468.894-.573 1.262zm-.153-2.51c-.356.142-.85.313-1.197.698l1.485 1.34c-.033.037-.054.039.012.005c.083-.042.204-.091.443-.187z"/></g></svg>,
          cardTitle : "Etablissement",
          cardNumber : data?.etablishments,
          cardDif : +7,

      },
      {
          cardColor : "bg-gray-200",
          cardIcon : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-wheelchair" viewBox="0 0 16 16">
                          <path d="M12 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.663 2.146a1.5 1.5 0 0 0-.47-2.115l-2.5-1.508a1.5 1.5 0 0 0-1.676.086l-2.329 1.75a.866.866 0 0 0 1.051 1.375L7.361 3.37l.922.71-2.038 2.445A4.732 4.732 0 0 0 2.628 7.67l1.064 1.065a3.25 3.25 0 0 1 4.574 4.574l1.064 1.063a4.732 4.732 0 0 0 1.09-3.998l1.043-.292-.187 2.991a.872.872 0 1 0 1.741.098l.206-4.121A1 1 0 0 0 12.224 8h-2.79l1.903-2.854ZM3.023 9.48a3.25 3.25 0 0 0 4.496 4.496l1.077 1.077a4.75 4.75 0 0 1-6.65-6.65l1.077 1.078Z"/>
                      </svg>,
          cardTitle : "Commandes",
          cardNumber : data?.sales,
          cardDif : -12
      },
      {
          cardColor : "bg-gray-200",
          cardIcon : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hospital" viewBox="0 0 16 16">
                          <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1h1ZM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25z"/>
                          <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1zm2 14h2v-3H7zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm0-14H6v1h4zm2 7v7h3V8zm-8 7V8H1v7z"/>
                      </svg>,
          cardTitle : "Boissons",
          cardNumber : data?.drinks,
          cardDif : +10
      },
      {
          cardColor : "bg-gray-200",
          cardIcon : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                          <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z"/>
                      </svg>,
          cardTitle : "Utilisateurs",
          cardNumber : data?.users,
          cardDif : -10
      },  
    ];

    return(
        <div className="py-1">
          <div className="flex flex-col sm:flex-row max-w-100 gap-4 mb-4 mt-4">
              {/* {listCardElements.map(({cardColor, cardIcon, cardTitle, cardNumber, cardDif}, index: number) =>{
                  return (<CardDash key={index} cardColor={cardColor} cardIcon={cardIcon} cardTitle={cardTitle} cardNumber={cardNumber} cardDif={cardDif} />);
              })} */}
            <div className={`bg-green-500 shadow rounded-md p-4 w-full sm:w-1/4 mw-50`}>
                <div className={`flex flex-row justify-between gap-5 items-center text-gray-500`}>
                    <div className="flex flex-row items-center gap-3">
                        <span className={`bg-white bg-opacity-25 px-3 py-1 text-white fw-bold rounded shadow-lg`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M21 22V7.485c0-1.098 0-1.646-.316-2.11c-.315-.463-.896-.767-2.059-1.376l-1.48-.774c-1.824-.956-2.737-1.434-3.44-1.138C13 2.383 13 3.245 13 4.967V9m9 13H2M21 8h-2m2 3h-2m2 3h-2"/><path d="M8 13c0-1.886 0-2.828.586-3.414S10.114 9 12 9s2.828 0 3.414.586S16 11.114 16 13v9H8zm3.5 0h1m-1 3h1"/><ellipse cx="3.5" cy="14" rx="1.5" ry="2"/><path d="M3.5 16v6"/></g></svg>                        </span>
                        <span className="mb-0 text-sm text-white font-bold">{"Etablissement"}</span>
                    </div>
                </div>
                <div className={`flex justify-between items-center text-white gap-2 my-3`}>
                    <span className="text-2xl font-bold">
                        {data?.etablishments}
                    </span>
                </div>
            </div>
            <div className={`bg-red-500 shadow rounded-md p-4 w-full sm:w-1/4 mw-50`}>
                <div className={`flex flex-row justify-between gap-5 items-center text-gray-500`}>
                    <div className="flex flex-row items-center gap-3 text-white">
                        <span className={`bg-white bg-opacity-25 px-3 py-1 fw-bold rounded shadow-lg`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M17.5 5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"/><path d="M2.774 11.144c-1.003 1.12-1.024 2.81-.104 4a34 34 0 0 0 6.186 6.186c1.19.92 2.88.899 4-.104a92 92 0 0 0 8.516-8.698a1.95 1.95 0 0 0 .47-1.094c.164-1.796.503-6.97-.902-8.374s-6.578-1.066-8.374-.901a1.95 1.95 0 0 0-1.094.47a92 92 0 0 0-8.698 8.515"/><path d="M13.788 12.367c.022-.402.134-1.135-.476-1.693m0 0a2.3 2.3 0 0 0-.797-.451c-1.257-.443-2.8 1.039-1.708 2.396c.587.73 1.04.954.996 1.782c-.03.582-.602 1.191-1.356 1.423c-.655.202-1.378-.065-1.835-.576c-.559-.624-.502-1.212-.507-1.468m5.208-3.106L14 9.986m-5.34 5.34l-.653.653"/></g></svg>                        </span>
                        <span className="mb-0 text-sm font-bold">{"Ventes"}</span>
                    </div>
                </div>
                <div className={`flex justify-between items-center text-white gap-2 my-3`}>
                    <span className="text-2xl font-bold">
                        {data?.sales}
                    </span>
                </div>
            </div>
            <div className={`bg-blue-500 shadow rounded-md p-4 w-full sm:w-1/4 mw-50`}>
                <div className={`flex flex-row justify-between gap-5 items-center text-gray-500`}>
                    <div className="flex flex-row items-center gap-3 text-white">
                        <span className={`bg-white bg-opacity-25 px-3 py-1 fw-bold rounded shadow-lg`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><mask id="letsIconsDrink0" fill="#fff"><path d="M5 9.286c0-.266 0-.399.025-.509a1 1 0 0 1 .752-.752C5.887 8 6.02 8 6.286 8h11.428c.266 0 .399 0 .509.025a1 1 0 0 1 .752.752c.025.11.025.243.025.509V10c0 .929 0 1.393-.051 1.783a6 6 0 0 1-5.166 5.166C13.393 17 12.93 17 12 17c-.929 0-1.393 0-1.783-.051a6 6 0 0 1-5.166-5.166C5 11.393 5 10.93 5 10z"/></mask><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 21h6m-3 0v-5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M5 9.286c0-.266 0-.399.025-.509a1 1 0 0 1 .752-.752C5.887 8 6.02 8 6.286 8h11.428c.266 0 .399 0 .509.025a1 1 0 0 1 .752.752c.025.11.025.243.025.509V10c0 .929 0 1.393-.051 1.783a6 6 0 0 1-5.166 5.166C13.393 17 12.93 17 12 17c-.929 0-1.393 0-1.783-.051a6 6 0 0 1-5.166-5.166C5 11.393 5 10.93 5 10z" mask="url(#letsIconsDrink0)"/><path fill="currentColor" d="M11.039 11.725a1 1 0 1 0 1.922.55zm2.691-5.782l.962.275zm1.18-1.307l-.37-.929zm-.825.44l.742.67zm-1.124 7.199l1.731-6.057l-1.923-.55l-1.73 6.057zm2.321-6.71l4.09-1.637l-.743-1.856l-4.09 1.635zm-.59.653c.07-.248.107-.373.14-.46c.027-.07.028-.048-.005-.012l-1.485-1.34c-.347.385-.468.894-.573 1.262zm-.153-2.51c-.356.142-.85.313-1.197.698l1.485 1.34c-.033.037-.054.039.012.005c.083-.042.204-.091.443-.187z"/></g></svg>
                        </span>
                        <span className="mb-0 text-sm font-bold">{"Boissons"}</span>
                    </div>
                </div>
                <div className={`flex justify-between items-center text-white gap-2 my-3`}>
                    <span className="text-2xl font-bold">
                        {data?.drinks}
                    </span>
                </div>
            </div>
            <div className={`bg-yellow-500 shadow rounded-md p-4 w-full sm:w-1/4 mw-50`}>
                <div className={`flex flex-row justify-between gap-5 items-center text-gray-500`}>
                    <div className="flex flex-row items-center gap-3 text-white">
                        <span className={`bg-white bg-opacity-25 px-3 py-1 fw-bold rounded shadow-lg`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2q1.25 0 2.125.875T15 5t-.875 2.125T12 8t-2.125-.875T9 5t.875-2.125T12 2m0 7q1.175 0 2.325.275t2.075.775q.95.475 1.525 1.125T18.5 12.6v5.8q0 .425-.2.838t-.55.762t-.812.65t-1.038.55v-2.25q0-.95-1.312-1.55T12 16.8q-1.25 0-2.412.513T8.15 18.65q.95.375 1.95.525t2.05.175H13v2.6q-.175.05-.362.05h-.388q-.9 0-2.062-.2t-2.213-.625t-1.762-1.112T5.5 18.4v-5.8q0-.775.575-1.425t1.5-1.125q.95-.5 2.1-.775T12 9m0 6q.825 0 1.413-.587T14 13t-.587-1.412T12 11t-1.412.588T10 13t.588 1.413T12 15"/></svg>                        </span>
                        <span className="mb-0 text-sm font-bold">{"Utilisateurs"}</span>
                    </div>
                </div>
                <div className={`flex justify-between items-center text-white gap-2 my-3`}>
                    <span className="text-2xl font-bold">
                        {data?.users}
                    </span>
                </div>
            </div>
          </div>
          <EstablishmentList />
        </div>
    )
}
export default Dashboard