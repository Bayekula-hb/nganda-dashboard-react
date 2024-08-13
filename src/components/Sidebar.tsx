"use client"

import Image from "next/image";
// import SearchBarComponent from "./SearchBar";
import Link from "next/link";
import { ListMenu, MenuSupport } from "../../src/config/config";
import { usePathname } from "next/navigation";
import ProfilComponent from "./Profil";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"

const SideBarComponent =  ({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) => {

    const location = usePathname();
    
    return(
        <div className="flex">
            <div className="hidden sm:flex w-64 fixed flex-col items-center h-screen z-50 border-r-2 border-gray-700 ">
                <Link 
                    className="w-full p-2 flex items-center gap-3 border-b" 
                    href={"/"}
                >
                    <Image
                        className="h-full max-w-none object-cover"
                        src={"/img/nganda-logo.jpg"}
                        alt="Nganda Tableau de Bord"
                        width={73}
                        height={50}
                    />
                    <h5 className="">Nganda</h5>
                </Link>

                <div className="w-full self-center content-center">
                    <div className="">
                        <h5 className="my-1 mx-4 text-gray-500 font-medium p-2 uppercase space-x-3">Menu principal</h5>       
                        <ul>
                            {ListMenu.map((item: any, index: number) => (
                                <li className={`flex space-x-3 w-full items-center my-1 ${location == item.slug || location.includes(item.slug) ? 'bg-blue-100 rounded border-l-4 border-blue-600 text-blue-600 font-medium hover:text-gray-800 hover:border-gray-800' : 'border-l-4 border-transparent  rounded hover:bg-blue-600 hover:text-white'}`} key={index}>
                                    <Link href={`/${typeof window !== 'undefined' ? localStorage.getItem("lastName") : "user"}/${item.slug}`} className={`text-xs flex justify-between mx-3 items-center w-full p-2 `}>
                                        <span 
                                        className={`flex items-center gap-4`}>
                                        {item.icon}
                                        {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>  
                    <div className='my-2 border-[2px] border-gray-400 p-0 ml-4 mr-4 rounded-sm hidden'></div>
                    {/* <div className="hidden">
                        <h5 className="my-1 mx-4 text-gray-500 font-medium p-2 uppercase space-x-3">Menu secondaire</h5>    
                        <ul>
                            {MenuSupport.map((item: any, index: number) => (
                            <li className={`flex space-x-3 w-full items-center my-1 ${location == item.slug || location.includes(item.slug) ? 'bg-blue-100 rounded border-l-4 border-blue-600 text-blue-600 font-medium hover:text-gray-800 hover:border-gray-800' : 'border-l-4 border-transparent rounded hover:bg-blue-600 hover:text-white'}`} key={index}>
                                <Link href={`/${params?.slug}/${item.slug}`} className={`text-xs flex justify-between mx-3 items-center w-full p-2 `}>
                                <span 
                                    className={`flex items-center gap-4`}>
                                    {item.icon}
                                    {item.name}
                                </span>
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            </div>
            <div className="hidden sm:flex md:ml-64 pl-[1.8px] max-h-2.5">
                <div className="z-50 z-[200] fixed bg-neutral-50 p-2 px-6 w-5/6 shadow-md gap-2 flex items-center justify-end">
                    {/* <div className="w-1/4">
                        <SearchBarComponent />
                    </div> */}
                    <div className="w-1/4 p-2 flex justify-end">
                        <ProfilComponent />
                    </div>
                </div>
                <div className="mt-20 mt-[5rem] px-4 ">
                    {children}
                </div>
            </div>
            <div className="sm:hidden z-[200] max-h-24 w-full flex gap-2 justify-between fixed bg-neutral-50 p-4 shadow-md gap-2">
                <div>
                    <Link
                        href={"/"}
                    >
                        <h1 className="text-lg text-blue-700 italic font-semibold">Nganda</h1>
                    </Link>
                </div>
                <div>
                    <Menubar className="">
                        <MenubarMenu>
                            <MenubarTrigger className="border-0">                                
                                <span className="text-blue-700 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5M7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"/></svg>
                                </span>
                            </MenubarTrigger>
                            <MenubarContent>
                                {ListMenu.map((item: any, index: number) => (
                                    <>
                                    <MenubarItem className={`flex space-x-3 w-full items-center my-1 ${location == item.slug || location.includes(item.slug) ? 'bg-blue-100 rounded border-l-4 border-blue-600 text-blue-600 font-medium hover:text-gray-800 hover:border-gray-800' : 'border-l-4 border-transparent  rounded hover:bg-blue-600 hover:text-white'}`} key={index}>
                                        <Link href={`/${typeof window !== 'undefined' ? localStorage.getItem("lastName") : "user"}/${item.slug}`} className={`text-xs flex justify-between mx-3 items-center w-full p-0 `}>
                                            <span 
                                            className={`flex items-center gap-4`}>
                                            {item.icon}
                                            {item.name}
                                            </span>
                                        </Link>
                                    </MenubarItem>
                                    {/* <MenubarSeparator /> */}
                                    </>
                                ))}
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                </div>
            </div>
            <div className="max-w-screen-sm overflow-x-scroll flex flex-col gap-2 sm:hidden">
                
                <div className="mt-20 mt-[5rem] px-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SideBarComponent;