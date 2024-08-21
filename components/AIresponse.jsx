import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import{query, where, collection, getDocs } from "firebase/firestore"
import { getCookie } from 'cookies-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
let inventory=[] 
  
    const fetchInventory=async()=>{
        
          const q = query(collection(db, "users"), where("password", "==", getCookie('jwt')),where("email","==",getCookie('email')))
          const users = await getDocs(q);
          const userDocRef = users.docs[0].ref.id
          if (typeof window !== "undefined") {
          localStorage.setItem('ref',userDocRef)
        }
          const invent=await getDocs(collection(db, "users", userDocRef, "inventory"))
          
          invent.forEach((i) => {
            const {name}=i.data()
            inventory.push(name);
          });
          if(inventory.length>1){
            return fetchAIResponse()
          }
          
};



const fetchAIResponse = async () => {
   
    
    
    try {
      console.log("The inventory req",inventory)
      const response = await fetch('/api/getRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ array: inventory }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json()
      let recipe=data.recipe;

      //recipe= jsonString.replace(/```json|```/g, '').trim();
      return recipe


    } catch (error) {
      throw new Error('Failed to fetch AI response: ' + error.message);
    }
  };

const AIResponse = ({inventory}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAIResponse = async () => {
      try {
        const aiResponse = await fetchInventory();
        setResponse(JSON.parse(aiResponse));
        console.log(JSON.parse(aiResponse))
      } catch (err) {
        setError("Failed to fetch AI response.");
      } finally {
        setLoading(false);
      }
    };

    getAIResponse();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-3 lg:mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">AI Recipe</h2>
      
      {loading && (
        <p className="text-lg text-gray-500">Loading...</p>
      )}
      
      {error && (
        <p className="text-lg text-red-500">{error}</p>
      )}
      
      {response && (
        <p className="text-lg text-gray-700 flex flex-col">
           <span className="font-bold m-2"> {response.title}</span>
           <span className='flex  text-md'><FontAwesomeIcon className='text-black p-2' icon={faClock}/> <span className='font-bold'>Duration:</span> <span className="text-md px-2">{response.duration}</span></span>
           <span className='flex  ml-2 text-md'> <span className='font-bold'>Ingredients:</span> <span className="text-md px-2">{response.ingredients}</span></span>
           <span className="w-full p-2 font-bold text-md">
            {response.recipe}
           </span>

            
            
        </p>
      )}
    </div>
  );
};

export default AIResponse;
