import { useNavigate } from "react-router-dom"

export default function Splash() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6">

            <div className="w-20 h-20 bg-primarylight rounded-3xl flex items-center justify-center text-4xl mb-6">
                💬
            </div>

            <h1 className="text-white text-3xl font-semibold mb-2">
                VisioChat
            </h1>

            <p className="text-muted text-center text-sm leading-relaxed mb-10">
                Smart messaging with full control over who sees what and when
            </p>

            <div className="w-full max-w-xs flex flex-col gap-3">
                <button
                    onClick={() => navigate("/signup")}
                    className="w-full bg-primarylight text-primarydark font-semibold py-3 rounded-full text-sm"
                >
                    Get Started
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="w-full border border-muted text-muted font-semibold py-3 rounded-full text-sm"
                >
                    I already have an account
                </button>
            </div>

        </div>
    )
}