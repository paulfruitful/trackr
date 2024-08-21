import React,{forwardRef,useState} from 'react'
import {v4} from "uuid"
import{addDoc,collection } from "firebase/firestore"
import { db } from "../firebase"

const Modal = forwardRef(
    ({inventory,setInventory,count},ref) => {
    const [name,setName]=useState('')
    const [qty,setQty]=useState(0)
    const [image,setImage]=useState(['https://plus.unsplash.com/premium_photo-1664527308003-82ef756f40e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2Vob2xkJTIwaXRlbXN8ZW58MHx8MHx8fDA%3D','https://images.unsplash.com/photo-1716203045308-e497c8337b96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2Vob2xkJTIwaXRlbXN8ZW58MHx8MHx8fDA%3D','https://images.unsplash.com/photo-1719427129634-c1794a1ebbd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZCUyMGl0ZW1zfGVufDB8fDB8fHww'])
    if (typeof window !== "undefined") {
    const inventoryRef=collection(db, "users", localStorage.getItem('ref'), "inventory")
    }
    const closeModal=()=>{
        if (ref.current) {
        ref.current.className = "fixed z-10 overflow-y-auto top-0 w-full left-0 hidden";
      }
      console.log('You touched')
      }
      const createPantry=async()=>{
        const p={
        id:v4(),
        name:name,
        quantity:parseInt(qty),
        image:image[Math.floor(Math.random() * image.length)]  
        }
        
        const docRef = await addDoc(inventoryRef,p);
        console.log(Math.floor(Math.random(5) * image.length))
        const newLength=inventory.length+1
        setInventory([...inventory,p])
        count(newLength)
        if (typeof window !== "undefined") {
          localStorage.setItem('count',newLength)
        }
        closeModal()
      }
    
  return (
<div ref={ref} class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label class="font-medium text-gray-800">Name</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} class="w-full outline-none rounded bg-gray-100 text-black p-2 mt-2 mb-3" />
        <label class="font-medium text-gray-800">Quantity</label>
        <input type="number" onChange={(e)=>setQty(e.target.value)} class="w-full outline-none rounded bg-gray-100 text-black p-2 mt-2 mb-3" />
      </div>
      <div class="bg-gray-200 px-4 py-3 text-right">
        <button onClick={()=>{closeModal()}} class="py-2 px-4 bg-gray-500 text-white rounded active:bg-gray-700 mr-2" ><i class="fas fa-times"></i> Cancel</button>
        <button onClick={()=>{createPantry()}} class="py-2 px-4 bg-green-600 text-white rounded font-medium active:bg-green-700 mr-2 transition duration-500"><i class="fas fa-plus"></i> Create</button>
      </div>
    </div>
  </div>
  </div>
  )
})
Modal.displayName = 'Modal';
export default Modal
