import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect(); // Connect to DB globally

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check  user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare password 
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user._id,
      email: user._id
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })

    // generate a token here (JWT )
    const response =  NextResponse.json({
      message: "Login successful",
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    })

    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
