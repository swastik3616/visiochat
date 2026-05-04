import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Purple Section */}
            <div className="bg-primary px-6 pt-12 pb-8">
                <h1 className="text-white text-2xl font-semibold">Welcome back!</h1>
                <p className="text-muted text-sm mt-1">Sign in to VisioChat</p>
            </div>

            {/* Form Section */}
            <div className="flex-1 px-6 pt-8 flex flex-col gap-5">

                {/* Phone Input */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Phone number</label>
                    <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                    <span className="text-primary text-sm cursor-pointer font-medium">
                        Forgot password?
                    </span>
                </div>

                {/* Sign In Button */}
                <button
                    onClick={() => navigate("/chats")}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition mt-2"
                >
                    Sign In
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-muted"></div>
                    <span className="text-muted text-xs">or</span>
                    <div className="flex-1 h-px bg-muted"></div>
                </div>

                {/* Google Button */}
                <button className="w-full border border-muted bg-primarylight text-primarydark font-medium py-3 rounded-full text-sm hover:opacity-90 transition">
                    Continue with Google
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-400">
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