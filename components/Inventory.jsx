import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const Inventory = ({name,quantity,image}) => {

    const [qty,setQty]=useState(quantity)
return(
    <div className="flex w-[350px] lg:w-[600px] shadow-lg mt-[30px] self-center  justify-between bg-[#1A1A1A] ">
        <div className="flex p-3 ">
            <img src={image} className="w-[50px] h-[50px]"/>
            <span className="text-white p-3  text-[23px]">{name}</span>
        </div>

        
        <div className=" p-3 flex items-center">
            <span className="text-[12px]  p-3 text-center font-bold text-white">Qty: {qty}</span>
           
            <button className="bg-white text-black transition-colors duration-100 active:bg-gray-300 rounded-full text-center  shadow-sm px-3 " onClick={()=>{setQty(qty+1)}}>+</button>
            <button className="bg-black rounded-md mx-2 shadow-sm px-3 transition-colors duration-100 active:bg-gray-700 " onClick={()=>{setQty(qty-1)}}>-</button> 
            <button  className=" shadow-sm p-3">      <FontAwesomeIcon icon={faTrash} className='text-gray-300 transition-colors duration-100 ease-in-out active:text-red-500'/></button>

        </div>




    </div>
    )
}

export default Inventory
