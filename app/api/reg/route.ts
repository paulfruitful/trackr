import { NextResponse } from "next/server";
import {publicEncrypt } from 'crypto';

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a color generator.\nA user passess you a name in this format {name:'the name'} and you would return the user any random color hex number in this format '#0000' Note: #0000 was for example, your generation should be random  ",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(name) {
    const chatSession = model.startChat({
    generationConfig,
      history: [],
    });
  
    const result = await chatSession.sendMessage(`{name:${name}}`);
    return result.response.text();
  }
  
  
export async function POST(request:Request) {
    const data=await request.json()
    const {token,name}=data
    let colour=await run(name)
    colour=colour.replace('\n','')
    colour=colour.trim()
    const res=NextResponse.json({})
   res.cookies.set({
        name:'jwt',
        value:token
    })
 
    return NextResponse.json({'success':true,token:token,'color':colour})
}