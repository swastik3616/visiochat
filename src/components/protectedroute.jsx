import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                navigate("/login")
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-primarylight flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-3xl">
                    💬
                </div>
                <div className="text-primarydark text-sm font-medium">Loading...</div>
            </div>
        )
    }

    return user ? children : null
}