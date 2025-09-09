"use client"

import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";
import toast from "react-hot-toast"

export default function ProfilePage() {

    const router = useRouter();
    const [data,setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get("api/users/logout");
            toast.success("User logged out successfully");
            router.push("/login");
        }
        catch (error: any) {
            console.log(error.message)
            toast.error("an error occured")
        }
    }
    const getUserDetails = async () => {
        try{
           // console.log("========majoj--")

            const res = await axios.get('/api/users/me')
            // console.log(res.data,"========majoj")
            setData(res.data.data._id)
        }catch(error:any){
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex justify-between p-4">
                <h2 className="p-3 bg-green-500">{data=== 'nothing'? "Nothing": <Link href={`/profile/${data}`}>{data}</Link> }</h2>
                <h1 className="text-blue-700">profile Component Page</h1>
                <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
                <button onClick={getUserDetails} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Get details</button>
            </div>
        </>
    )
}