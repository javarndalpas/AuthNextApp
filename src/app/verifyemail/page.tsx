"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState();

    const verifyUserEmail = async () => {
        try {
            debugger
            const data = await axios.post("/api/users/verifyemail", { token })
          
            setVerified(true);
        } catch (error) {
            console.log(error,"errrr");
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
         console.log(urlToken,"000")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }

    }, [token])

    return (

        <div className="">
            <h1>Verify Email</h1>
            <h2>{token ? '${token}' : "no token"}</h2>
            {
                verified && (
                    <>
                        <h2>Email verified</h2>
                        <Link href="/">Login</Link>
                    </>
                )
            }

            {
                error && (
                    <>
                        <h2>Error</h2>
                        <h3></h3>
                    </>
                )
            }
        </div>
    )
}