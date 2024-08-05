import { NextResponse } from "next/server";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model =  genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: 'You are an experienced chef. You will be provided with an array containing objects that represent various foodstuffs and kitchen items. Using these objects, generate a recipe that can be made with the provided items.If the array contains items, create a recipe using these items.If the array is empty, return a random recipe.Return the recipe as a  plain text-like JSON object in the following format: { "title": "Title of the dish",  "duration": "Time it would take to complete",  "ingredients": "List of ingredients",  "recipe": "Step-by-step instructions on how to make the dish"}',
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