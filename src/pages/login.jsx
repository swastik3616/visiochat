import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill all fields")
            return
        }
        try {
            setLoading(true)
            setError("")
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/chats")
        } catch (err) {
            setError("Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogle = async () => {
        try {
            setLoading(true)
            setError("")
            await signInWithPopup(auth, googleProvider)
            navigate("/chats")
        } catch (err) {
            setError("Google sign in failed. Try again!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Purple Section */}
            <div className="bg-primary px-6 pt-12 pb-8">
                <h1 className="text-white text-2xl font-semibold">Welcome back!</h1>
                <p className="text-muted text-sm mt-1">Sign in to VisioChat</p>
            </div>

            <div className="flex-1 px-6 pt-8 flex flex-col gap-5">

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                <div className="text-right">
                    <span className="text-primary text-sm cursor-pointer font-medium">
                        Forgot password?
                    </span>
                </div>

                {/* Sign In Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-60"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-muted"></div>
                    <span className="text-muted text-xs">or</span>
                    <div className="flex-1 h-px bg-muted"></div>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full border border-muted bg-primarylight text-primarydark font-medium py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    <span>🌐</span>
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-400 pb-6">
                    New here?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-primary font-semibold cursor-pointer"
                    >
                        Create account
                    </span>
                </p>

            </div>
        </div>
    )
}