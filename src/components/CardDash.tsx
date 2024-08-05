import React, { ReactNode } from 'react';

const CardDash = ({ cardColor ,cardIcon, cardTitle, cardNumber, cardDif} : {cardColor: string ,cardIcon: any, cardTitle: string, cardNumber: number | undefined, cardDif: any})=>{

    return (
        <div className={`${cardColor} shadow rounded-md p-4 w-full sm:w-1/4 mw-50`}>
            <div className={`${cardColor == 'bg-success'  ? 'flex flex-row justify-between gap-5 items-center text-gray-500' : 'flex flex-row justify-between gap-5 items-center text-lg' }`}>
                <div className="flex flex-row items-center gap-3">
                    <span className={`${cardColor == 'bg-success'  ? 'bg-white bg-opacity-25 px-3 py-1 text-white fw-bold rounded shadow-lg' : 'bg-gray-700 bg-opacity-25 px-3 py-1 text-gray-700 fw-bold rounded shadow-lg' }`}>
                        {cardIcon}
                    </span>
                    <span className="mb-0 text-sm text-gray-700 font-bold"> {cardTitle}</span>
                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                </svg> */}
            </div>
            <div className={`${cardColor == 'bg-success'  ? 'flex justify-between items-center text-gray-700 gap-2 my-3' : 'flex  justify-between items-center text-gray-700 text-lg gap-2 my-3' }`}>
                <span className="text-2xl font-bold">
                    {cardNumber}
                </span>
                <div className='hidden flex flex-col'>
                    <div className={parseInt(cardDif) < 0 ? 'flex gap-2 text-red-500'  : 'flex gap-2 text-green-500'}>
                        {parseInt(cardDif) < 0 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M320 384l61.8-61.8-93.5-98.2-107 106.7L32 128l149.3 128 107-112 130.9 140.8L480 224v160z" fill="currentColor"/></svg>
                            :                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M320 128l61.8 61.8-93.5 98.2-107-106.7L32 384l149.3-128 107 112 130.9-140.8L480 288V128z" fill="currentColor"/></svg>
                        }
                        <span>{cardDif} %</span>
                    </div>
                    <span className='text-sm'>7 jours passés</span>
                </div>
            </div>
        </div>
    )
}
export default CardDash;