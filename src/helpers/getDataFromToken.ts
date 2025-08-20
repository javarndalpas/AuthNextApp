import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export const getDataFromToken = (request: NextResponse) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}