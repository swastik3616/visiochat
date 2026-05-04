import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Purple Section */}
            <div className="bg-primary px-6 pt-12 pb-8">
                <button
                    onClick={() => navigate("/")}
                    className="text-white text-sm mb-4 flex items-center gap-1"
                >
                    ← Back
                </button>
                <h1 className="text-white text-2xl font-semibold">Create account</h1>
                <p className="text-muted text-sm mt-1">Join VisioChat today</p>
            </div>

            {/* Form Section */}
            <div className="flex-1 px-6 pt-8 flex flex-col gap-5">

                {/* Full Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Full name</label>
                    <input
                        type="text"
                        placeholder="Your full name"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Phone number</label>
                    <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Email address</label>
                    <input
                        type="email"
                        placeholder="you@email.com"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Role Selection */}
                <div className="flex flex-col gap-2">
                    <label className="text-primarydark text-sm font-medium">I am a</label>
                    <div className="flex gap-3">
                        <button className="flex-1 border-2 border-primary bg-primarylight text-primarydark font-medium py-2 rounded-xl text-sm">
                            👨‍🏫 Teacher
                        </button>
                        <button className="flex-1 border border-muted text-muted font-medium py-2 rounded-xl text-sm">
                            👨‍🎓 Student
                        </button>
                    </div>
                </div>

                {/* Create Account Button */}
                <button
                    onClick={() => navigate("/chats")}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition mt-2"
                >
                    Create Account
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-400 pb-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-primary font-semibold cursor-pointer"
                    >
                        Sign in
                    </span>
                </p>

            </div>
        </div>
    )
}