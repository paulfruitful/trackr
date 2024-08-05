import { NextResponse } from "next/server";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model =  genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a chef.\nYou would be provided an array containing objects that representing foodstuff and kitchen items.\nUsing the objects you would generate a recipe that one can make with these objects.\nReturn the recipe if there are items in the array, but if there are no items in the array return you have no pantry items  to create a recipe with, return to the inventory page to add a new  item",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(arr) {
    const chatSession = model.startChat({
    generationConfig,
      history: [],
    });
  
    const result = await chatSession.sendMessage(`${JSON.stringify(arr)}`);
    return result.response.text();
  }
  
  export async function POST(req:Request) {
      const {array}=await req.json()
      const recipe=await run(array)
      return NextResponse.json({"success":true,"recipe":recipe})
    
  }