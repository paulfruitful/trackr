"use client"
import Nav from "../../components/Nav"
import Liner from "../../components/Liner"
import { db } from "../../firebase";
import { useState, useRef, useEffect } from 'react';
import{query, where, collection, getDocs } from "firebase/firestore"
import AIresponse from "../../components/AIresponse"
import "../../fontawesome"
import { getCookie } from "cookies-next"

const page = () => {
    
 
  return (
    <div className="grid w-full overflow-y-auto h-screen pb-[8pc]" style={{height:'100vh',width:'100vw'}}>
      <div className="flex flex-col">
        <Nav/>
        <div className="flex text-center w-full justify-center" style={{marginTop:'1pc', marginBottom:'2pc'}}>
            <span className="lg:text-3xl text-2xl text-white ">Welcome Back <span className="lg:text-3xl text-2xl">{getCookie('name')} 👋</span></span>
        </div>
        <Liner/>
        <AIresponse />

      </div>
    </div>
  )
}

export default page
