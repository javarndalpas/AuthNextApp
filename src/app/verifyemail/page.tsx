"use client"

import { useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState();
    const [verifyd, setVerifyd] = useState();
    const [error, setError] = useState();


    const verifyUserEmail = () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

}