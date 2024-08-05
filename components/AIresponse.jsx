import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import{query, where, collection, getDocs } from "firebase/firestore"
import { getCookie } from 'cookies-next';

let inventory=[] 
  
    const fetchInventory=async()=>{
        
          const q = query(collection(db, "users"), where("password", "==", getCookie('jwt')),where("email","==",getCookie('email')))
          const users = await getDocs(q);
          const userDocRef = users.docs[0].ref.id
          localStorage.setItem('ref',userDocRef)
          const invent=await getDocs(collection(db, "users", userDocRef, "inventory"))
          
          invent.forEach((i) => {
            const {name,quantity,image}=i.data()
            console.log('I AM A', i.data())
            inventory.push(name);
          });
          if(inventory.length>1){
            fetchAIResponse()
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
  
      const data = await response.json();
      
      return data.recipe;
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
        setResponse(aiResponse);
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
        <p className="text-lg text-gray-700">{response}</p>
      )}
    </div>
  );
};

export default AIResponse;
