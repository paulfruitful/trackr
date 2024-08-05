import { NextResponse } from 'next/server';
import { logout } from '../../../lib/logout';

export async function POST(req) {
  logout();
  return NextResponse.json({success:true});
}
