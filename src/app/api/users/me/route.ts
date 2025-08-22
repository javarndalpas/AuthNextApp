import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request);
        console.log("====usdId",userId)
        
        const user = await User.findOne({ _id: userId });
        console.log("====usd",user)
        return NextResponse.json({
            massage: " user found",
            data: user
        })
    }

    catch (error: any) {
        return NextResponse.json(
            { error: error.massage },
            { status: 400 }
        );
    }
}