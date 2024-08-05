import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { db } from '../firebase';
import { getFirestore, doc, updateDoc } from "firebase/firestore";


const Inventory = ({ref,id,del,name,quantity,image,inventory,setInventory,count}) => {
 
    const [qty,setQty]=useState(quantity)

 const increaseQty=async ()=>{
    
    console.log("From Increase ID",id)
    setQty(qty+1)
    const invent=await doc(db,'users',localStorage.getItem('ref'),'inventory',id)
    
    await updateDoc(invent, {
        quantity: qty+1
      });
}


const decreaseQt =async () => {
    
    console.log("From Increase ID",id)
    if (qty-1<1) {
      del(id)
      return
    }

    setQty(qty - 1); 
    const invent=await doc(db,'users',localStorage.getItem('ref'),'inventory',id)
    
    await updateDoc(invent, {
        quantity: qty+1
      });
 
};
 return(
    <div className="flex w-[350px] lg:w-[600px] shadow-lg mt-[30px] self-center  justify-between bg-[#1A1A1A] ">
        <div className="flex p-3 ">
            <img src={image} className="w-[50px] h-[50px]"/>
            <span className="text-white p-3  text-[23px]">{name}</span>
        </div>

        
        <div className=" p-3 flex items-center">
            <span className="text-[12px]  p-3 text-center font-bold text-white">Qty: {qty}</span>
            <button className="bg-white text-black transition-colors duration-100 active:bg-gray-300 rounded-full text-center  shadow-sm px-3 " onClick={()=>increaseQty()}>+</button>
            <button className="bg-black rounded-md mx-2 shadow-sm px-3 transition-colors duration-100 active:bg-gray-700 " onClick={()=>decreaseQt()}>-</button> 
            <button  className=" shadow-sm p-3" onClick={()=>del(id)}>      <FontAwesomeIcon icon={faTrash} className='text-gray-300 transition-colors duration-100 ease-in-out active:text-red-500'/></button>

        </div>




    </div>
    )
}

export default Inventory
