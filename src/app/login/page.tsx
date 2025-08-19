"use client"

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogIn = async () => {

        try {
            setLoading(true);
            console.log(user);
            const response = await axios.post("/api/users/login", user)
            console.log("login successful", response.data);
            toast.success("Login successful")
             router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) =>{
        const {name,value} = e.target;
        console.log(name,value);

        setUser((user)=>({
            ...user,
            [name]: value
        }))
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [])

    return (
        <>
            <div >
                <form className="max-w-md mx-auto mt-18">
                    <h1 >{loading ? "Processing" : "Login"}</h1>
                    <br />

                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={(e)=>handleChange(e)} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input onChange={(e)=>handleChange(e)}  type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <button type="button" onClick={onLogIn} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    <h1>Don't have an account? <Link className="text-blue-600" rel="stylesheet" href="/signup">Signup</Link> </h1>
                </form>
            </div>
        </>
    )
}


