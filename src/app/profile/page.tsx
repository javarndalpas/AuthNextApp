"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProfilePage() {

    const router = useRouter();

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

    return (
        <>
            <div className="flex justify-between p-4">
                <h1 className="text-blue-700">profile Component Page</h1>
                <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
            </div>
        </>
    )
}