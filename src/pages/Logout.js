import { useNavigate } from "react-router-dom"


export default function Logout() {
    const nav = useNavigate()
    localStorage.removeItem("token")
    nav("/login")
    window.location.reload(false)
}