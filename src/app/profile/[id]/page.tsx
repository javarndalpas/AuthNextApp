export default function UserProfile({params} : any) {
    return (
    <>
    <h1 className="p-4">profile Details Page </h1>
    <hr />
    <h2 className="p-4">profile id page <span className="bg-amber-200 p-2"> {params.id}</span></h2>
    </>
)
}