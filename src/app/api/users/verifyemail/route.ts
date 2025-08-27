import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {

    try {
        const reqbody = await request.json();
        const { token } = reqbody;
        console.log(token);
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        console.log("enter", user);
        if (!user) {
            return NextResponse.json({ error: "invalid Token" },
                { status: 400 }
            )
        }

        console.log(user, "=====");
        user.isVerified == "true";
        user.verifiedToken = "undefined";
        user.verifyTokenExpiry = "undefined";
         await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            status: 200 ,
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}