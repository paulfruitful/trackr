"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {ToastContainer, toast} from 'react-toastify'
import {v4} from "uuid"
import '../globals.css'
import { db } from '../../firebase';
import{doc,setDoc, query, collection, where,getDocs, addDoc} from "firebase/firestore"
import crypto from 'crypto'
import { setCookie } from 'cookies-next';

import 'react-toastify/dist/ReactToastify.css';

export default function Example() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 // const [message,setMessage]=useState('')
  const Router=useRouter()

  const handleSubmit = async (e) => {
    const tost=toast.loading('Creating Account....')
    e.preventDefault();
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.dismiss(tost)
  
      toast.error('User Already Exists Login');
      return;
    } 
    const id=v4()
    const userRef = doc(db, "users", id);
   // const inventoryRef = collection(userRef, "inventory");
    //const docRef = await addDoc(inventoryRef, {});
    await setDoc(userRef, {
      name,
      email,
      password:crypto.createHash('sha256').update(password).digest('hex'),
      createdAt: new Date().toISOString(),
    });
    
    
    const userPreferencesRef = collection(userRef, 'inventory');
    //await addDoc(userPreferencesRef, {});
    setCookie('name',name)
    const req=await fetch('api/reg',{
      method:'POST',
      body: JSON.stringify({token:crypto.createHash('sha256').update(password).digest('hex'),name:name})
    })

    const res=await req.json()

    if(res.success){
    toast.dismiss(tost)
    toast.success('Account Created Successfully')
    setCookie('jwt',res.token)
    setCookie('email',email)
    setCookie('color',res.color)
    Router.push('/inventory')
    }else{
      toast.dismiss(tost)
    toast.error('Server Error: something Went Wrong')
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
            Create An Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium leading-6 text-white">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 p-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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

          
          <p className="mt-10 text-center text-sm text-gray-400">
            Already a user?{' '}
            <a href="/login" className="font-semibold leading-6 text-green-400 hover:text-green-500">
              Login
            </a>
          </p>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
