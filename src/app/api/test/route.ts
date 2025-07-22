// app/api/test/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connect } from '@/dbConfig/dbConfig';


connect();

export async function GET() {
  try {
    console.log(process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL!);
    return NextResponse.json({ success: true, message: "MongoDB connected" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
