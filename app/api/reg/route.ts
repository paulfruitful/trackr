import { NextResponse } from "next/server";
import {publicEncrypt } from 'crypto';

export async function POST(request:Request) {
    const data=await request.json()
    const {token}=data
    const res=NextResponse.json({
        token: token
    })
   res.cookies.set({
        name:'jwt',
        value:token
    })
    return NextResponse.json({'success':true})
}