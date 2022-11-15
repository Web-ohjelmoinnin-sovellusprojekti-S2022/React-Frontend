export default function Logout() {
    localStorage.removeItem("token")
    return <p>Logged out</p>
}