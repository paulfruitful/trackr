"use client"
import Nav from "../../components/Nav"
import "../../fontawesome"
import Hero from "../../components/Hero"
import Inventory from "../../components/Inventory"
import Modal from "../../components/Modal"
import { useState, useRef, useEffect } from 'react';
import ScrollToTopButton from "../../components/ScrollToTopButton"
import{doc,deleteDoc, query, where, collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { getCookie } from "cookies-next"




function Page() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
const [count,setCount]=useState('...')
  const [inventory,setInventory]=useState([ ])
    
  const [currentPage, setCurrentPage] = useState(1);
const [message,updateMessage]=useState('Loading...')
  const fetchInventory=async()=>{
    const q = query(collection(db, "users"), where("password", "==", getCookie('jwt')),where("email","==",getCookie('email')))
    const users = await getDocs(q);
    const userDocRef = users.docs[0].ref.id
    //console.log(users.docs[0].data())
    if (typeof window !== "undefined") {
    localStorage.setItem('ref',userDocRef)
  }
    const invent=await getDocs(collection(db, "users", userDocRef, "inventory"))
    const inventoryItems = [];
    invent.forEach((i) => {
      const {name,quantity,image}=i.data()
      inventoryItems.push({
        ref:i.ref,
        id: i.ref.id,
        name:name,
        image,image,
        quantity:quantity
      });
    });
    setInventory(inventoryItems);
    setCount(inventoryItems.length)
    if (typeof window !== "undefined") {
    localStorage.setItem('count',inventoryItems.length)
  }
   
    updateMessage('No Items Found')
  
 
};



  
  

  const del =async (id) => {
    const inv = inventory.filter(item => item.id !== id);
    
   // console.log("From Delete ID",id)
    setInventory(inv);
    if (typeof window !== "undefined") {
    const docRef =await doc(db,'users',localStorage.getItem('ref'),'inventory',id)
    await deleteDoc(docRef);
    
    localStorage.setItem('count',count-1)
    setCount(count-1)
    }
  };

    const itemsPerPage = 3; 
  useEffect(
    ()=>{
      fetchInventory()
    },[])
    
    const totalPages = Math.ceil(inventory.length / itemsPerPage);
    const currentItems = inventory.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.className = "fixed z-10 overflow-y-auto top-0 w-full left-0";
    }
    setIsModalOpen(true);
    //console.log('You clicked')
  };

  const search=(e)=>{
    const name=e.target.value
    //console.log(name)
    const regex = new RegExp(name, 'i');
    setInventory(inventory.filter(item => regex.test(item.name)));
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="grid w-full overflow-y-auto h-screen pb-[8pc]" style={{height:'100vh',width:'100vw'}}>
      <div className="flex flex-col">
      <Nav />
      <div className="p-6 flex flex-col items-center w-full">
  <div className="relative flex border-2 border-gray-400  px-4 py-[4px] pl-10">
    <input type="search" name="search" placeholder="cabbages..." className="outline-none self-start p-[3px] bg-transparent text-white text-lg" onChange={(e)=>search(e)} />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] justify-self-center p-[3px] mt-[2px] h-[30px]  text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      <input type="submit" value="" />
    
    </svg>   

  </div>
</div>
      <Hero open={openModal} count={count}/>
      {currentItems.length > 0 ? (
        currentItems.map((obj) => {
          
        //  console.log("From Map ID",obj.id)
          return(
          <Inventory
            del={del}
            ref={obj.ref}
            key={obj.id}
            id={obj.id}
            inventory={inventory}
            setInventory={setInventory}
            name={obj.name}
            quantity={obj.quantity}
            image={obj.image}
          />)
})
      ) : (
        <span className="text-lg text-center mt-[50px] text-gray-400"> {message}</span>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-transparent'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
    </div>
    <Modal inventory={inventory} setInventory={setInventory} count={setCount}  ref={modalRef} />
    <ScrollToTopButton/>
    </div>
  )
}
export default Page
