"use client"
import Nav from "../../components/Nav"
import "../../fontawesome"
import Hero from "../../components/Hero"
import Inventory from "../../components/Inventory"
import Modal from "../../components/Modal"
import { useState, useRef } from 'react';
import ScrollToTopButton from "../../components/ScrollToTopButton"
import{doc,setDoc,getDoc, query, where, collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { getCookie } from "cookies-next"




function Page() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchInventory=async()=>{
    const q = query(collection(db, "users"), where("password", "==", getCookie('jwt')))
    const users = await getDocs(q);
    const userDocRef = users.docs[0].ref.id;
    console.log(userDocRef)
    const subcollectionRef = collection(db,`users/${userDocRef}/inventory`)
    const querySnapshot = await getDocs(subcollectionRef);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
  }
  
  fetchInventory()
  const del = (id) => {
    const inv = inventory.filter(item => item.id !== id);
    setInventory(inv);
    setCount(count-1)
  };

  const [inventory,setInventory]=useState([ ])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 
  
    
    const totalPages = Math.ceil(inventory.length / itemsPerPage);
    const currentItems = inventory.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
const [count,setCount]=useState(inventory.length)
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.className = "fixed z-10 overflow-y-auto top-0 w-full left-0";
    }
    setIsModalOpen(true);
    console.log('You clicked')
  };

  const search=(e)=>{
    const name=e.target.value
    console.log(name)
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
        currentItems.map((obj) => (
          <Inventory
            del={del}
            key={obj.id}
            id={obj.id}
            inventory={inventory}
            setInventory={setInventory}
            name={obj.name}
            quantity={obj.quantity}
            image={obj.image}
          />
        ))
      ) : (
        <span className="text-lg text-center mt-[50px] text-gray-400"> No Items</span>
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
