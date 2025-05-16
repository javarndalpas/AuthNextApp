"use client"
import React from "react"

export default function SignUpPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignUp = () => {

    }

    return (
        <>
            <div className="">
                <h1>SignUp</h1>
                <hr />
                <label htmlFor="username">UserName</label>
                <input className="p-2" type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="UserName"
                />
            </div>
        </>
    )
}