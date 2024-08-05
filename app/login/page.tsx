"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {v4} from "uuid"
import { db } from '../../firebase';
import{doc,setDoc,getDoc, query, where, collection, getDocs } from "firebase/firestore"
import crypto from 'crypto'
import { setCookie } from 'cookies-next';


export default function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage]=useState('')
  const Router=useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        setMessage('User Not Found');
        
        return;
      }  
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      // Compare hashed passwords
      if (userData.password === hashedPassword) {
        
    setCookie('name',userData.name)
    const req=await fetch('api/reg',{
      method:'POST',
      body: JSON.stringify({token:crypto.createHash('sha256').update(password).digest('hex'),name:userData.name})
    })

    const res=await req.json()

    if(res.success){
    setCookie('jwt',res.token)
    setCookie('color',res.color)
    Router.push('/inventory')
    }else{


    setMessage('Server Error: something Went Wrong')
    }


      } else {
        setMessage('Invalid credentials');
       
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      
    }
  };

  





  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <svg
            width="24"
            className="mx-auto h-10 w-auto"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
           Login 
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
          
            <div>
              <label htmlFor="email" className="block text-lg font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-400 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-3 px-3 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}

          <p className="mt-10 text-center text-sm text-gray-400">
            Already a user?{' '}
            <a href="#" className="font-semibold leading-6 text-green-400 hover:text-green-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
