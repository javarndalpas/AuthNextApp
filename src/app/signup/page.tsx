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
            <div className="flex">
                <h1>SignUp</h1>
                <hr />
                <label htmlFor="username">UserName</label>
                <input type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="UserName"
                />
            </div>
        </>
    )
}