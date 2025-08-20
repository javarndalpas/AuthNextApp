import { connect } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";

connect()

export async function GET(request:NextRequest){

    try{

    }
    catch(error:any){
        throw new Error( error)
    }
}