/*import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {doc,setDoc} from "firebase/firestore"
import { db } from "@/firebase";
import { NextAuthConfig } from "next-auth";
const GoogleClientId=process.env.GOOGLE_CLIENT_ID
const GoogleSecret=process.env.GOOGLE_SECRET



const authOption:NextAuthConfig={
    session: {
      strategy: "jwt", // or "database"
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    callbacks: {
      async   signIn({ user, account, profile }) {
        // Handle sign-in logic here
        return true;
      },
      // Other callbacks as needed
    },
  };


const handler=NextAuth(authOption)

export {handler as GET, handler as POST}*/