"use client"
import Nav from "../../components/nav"
import "../../fontawesome"
import Hero from "../../components/Hero"
import Inventory from "../../components/Inventory"
import Modal from "../../components/Modal"
import { useState, useRef } from 'react';

function Page() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.className = "fixed z-10 overflow-y-auto top-0 w-full left-0";
    }
    setIsModalOpen(true);
    console.log('You clicked')
  };

  return (
    <div className="grid w-full overflow-hidden" style={{height:'100vh',width:'100vw'}}>
      <div className="flex flex-col">
      <Nav />
      <div className="p-6 flex flex-col items-center w-full">
  <div className="relative flex border-2 border-gray-400  px-4 py-[4px] pl-10">
    <input type="search" name="search" placeholder="Search" className="outline-none self-start p-[3px] bg-transparent text-white text-lg" />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] justify-self-center p-[3px] mt-[2px] h-[30px]  text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>   

  </div>
</div>
      <Hero open={openModal}/>

        <Inventory/>
        
        <Inventory/>
        
        <Inventory/>
        
        <Inventory/>
        
        <Inventory/>
        
        <Inventory/>
      </div>
      <Modal ref={modalRef} />
    </div>
  )
}

export default Page
