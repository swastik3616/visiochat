import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"
import { getGroup, joinGroup } from "../firebase/firestore"

export default function JoinGroup() {
    const { groupId } = useParams()
    const navigate = useNavigate()
    const [group, setGroup] = useState(null)
    const [status, setStatus] = useState("loading")
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchGroup = async () => {
            const data = await getGroup(groupId)
            if (!data) {
                setStatus("notfound")
                return
            }
            setGroup(data)
            setStatus("found")
        }
        fetchGroup()

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [groupId])

    const handleJoin = async () => {
        if (!user) {
            // Save groupId in localStorage then redirect to signup
            localStorage.setItem("pendingGroupId", groupId)
            navigate("/signup")
            return
        }

        // Already a member?
        if (group.members.includes(user.uid)) {
            navigate(
                group.adminId === user.uid
                    ? `/chat/admin/${groupId}`
                    : `/chat/member/${groupId}`
            )
            return
        }

        // Join the group
        setStatus("joining")
        await joinGroup(groupId, user.uid)
        setStatus("joined")
        setTimeout(() => {
            navigate(`/chat/member/${groupId}`)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6">

            {/* Logo */}
            <div className="w-16 h-16 bg-primarylight rounded-3xl flex items-center justify-center text-3xl mb-4">
                💬
            </div>
            <h1 className="text-white text-2xl font-semibold mb-1">VisioChat</h1>

            {/* Loading */}
            {status === "loading" && (
                <div className="mt-8 text-muted text-sm">Loading group info...</div>
            )}

            {/* Not Found */}
            {status === "notfound" && (
                <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6 w-full max-w-xs text-center">
                    <div className="text-4xl mb-3">❌</div>
                    <div className="text-white font-medium mb-2">Invalid invite link</div>
                    <div className="text-muted text-sm">This group does not exist or link has expired</div>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 w-full bg-primarylight text-primarydark font-semibold py-3 rounded-full text-sm"
                    >
                        Go to Home
                    </button>
                </div>
            )}

            {/* Group Found */}
            {status === "found" && group && (
                <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6 w-full max-w-xs text-center">
                    <div className="w-16 h-16 rounded-full bg-primarylight flex items-center justify-center text-2xl font-semibold text-primarydark mx-auto mb-3">
                        {group.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-white font-semibold text-lg mb-1">{group.name}</div>
                    <div className="text-muted text-sm mb-6">
                        {group.members.length} members · You are invited to join!
                    </div>
                    <button
                        onClick={handleJoin}
                        className="w-full bg-primarylight text-primarydark font-semibold py-3 rounded-full text-sm hover:opacity-90 transition"
                    >
                        {user ? "Join Group" : "Sign up to Join"}
                    </button>
                    {!user && (
                        <button
                            onClick={() => {
                                localStorage.setItem("pendingGroupId", groupId)
                                navigate("/login")
                            }}
                            className="mt-3 w-full border border-muted text-muted font-medium py-3 rounded-full text-sm"
                        >
                            Already have account? Login
                        </button>
                    )}
                </div>
            )}

            {/* Joining */}
            {status === "joining" && (
                <div className="mt-8 text-muted text-sm">Joining group...</div>
            )}

            {/* Joined */}
            {status === "joined" && (
                <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6 w-full max-w-xs text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <div className="text-white font-semibold text-lg">You joined!</div>
                    <div className="text-muted text-sm mt-1">Taking you to the group...</div>
                </div>
            )}

        </div>
    )
}