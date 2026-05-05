import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import { saveUser } from "../firebase/firestore"

export default function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("teacher")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
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

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError("Please fill all fields")
            return
        }
        try {
            setLoading(true)
            setError("")
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, { displayName: name })
            navigate("/login")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Purple Section */}
            <div className="bg-primary px-6 pt-12 pb-8">
                <button onClick={() => navigate("/")} className="text-white text-sm mb-4 flex items-center gap-1">
                    ← Back
                </button>
                <h1 className="text-white text-2xl font-semibold">Create account</h1>
                <p className="text-muted text-sm mt-1">Join VisioChat today</p>
            </div>

            <div className="flex-1 px-6 pt-8 flex flex-col gap-5">

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Full name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

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
                        placeholder="Create a password"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-2">
                    <label className="text-primarydark text-sm font-medium">I am a</label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setRole("teacher")}
                            className={`flex-1 border-2 font-medium py-2 rounded-xl text-sm transition ${role === "teacher"
                                ? "border-primary bg-primarylight text-primarydark"
                                : "border-muted text-muted"
                                }`}
                        >
                            👨‍🏫 Teacher
                        </button>
                        <button
                            onClick={() => setRole("student")}
                            className={`flex-1 border-2 font-medium py-2 rounded-xl text-sm transition ${role === "student"
                                ? "border-primary bg-primarylight text-primarydark"
                                : "border-muted text-muted"
                                }`}
                        >
                            👨‍🎓 Student
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition mt-2 disabled:opacity-60"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-400 pb-6">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-primary font-semibold cursor-pointer">
                        Sign in
                    </span>
                </p>
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
                    <span>Continue with Google</span>
                </button>

            </div>
        </div>
    )
}