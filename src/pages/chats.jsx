import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { getUserGroups } from "../firebase/firestore"

export default function Chats() {
    const navigate = useNavigate()
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const user = auth.currentUser

    useEffect(() => {
        const fetchGroups = async () => {
            if (!user) return
            const data = await getUserGroups(user.uid)
            setGroups(data)
            setLoading(false)
        }
        fetchGroups()
    }, [])

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Bar */}
            <div className="bg-primary px-6 pt-10 pb-4 flex items-center justify-between">
                <h1 className="text-white text-xl font-semibold">VisioChat</h1>
                <div className="flex gap-4">
                    <button className="text-white text-lg">🔍</button>
                    <button
                        onClick={() => { auth.signOut(); navigate("/login") }}
                        className="text-white text-sm border border-white px-3 py-1 rounded-full"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3 bg-primarylight">
                <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full bg-white border border-muted rounded-full px-4 py-2 text-sm text-primarydark outline-none"
                />
            </div>

            {/* Groups List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="text-muted text-sm">Loading chats...</div>
                    </div>
                ) : groups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-60 gap-3">
                        <div className="text-4xl">💬</div>
                        <div className="text-primarydark font-medium text-sm">No groups yet</div>
                        <div className="text-muted text-xs">Create a group to get started</div>
                    </div>
                ) : (
                    groups.map((group) => (
                        <div
                            key={group.id}
                            onClick={() =>
                                navigate(
                                    group.adminId === user.uid
                                        ? `/chat/admin/${group.id}`
                                        : `/chat/member/${group.id}`
                                )
                            }
                            className="flex items-center gap-3 px-4 py-3 border-b border-primarylight cursor-pointer hover:bg-primarylight transition"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                                {group.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-primarydark font-medium text-sm">{group.name}</div>
                                <div className="text-gray-400 text-xs mt-1">
                                    {group.members.length} members ·{" "}
                                    {group.adminId === user.uid ? "You are admin" : "Member"}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* FAB */}
            <button
                onClick={() => navigate("/create-group")}
                className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full text-2xl shadow-lg hover:opacity-90 transition flex items-center justify-center"
            >
                +
            </button>

            {/* Bottom Nav */}
            <div className="bg-white border-t border-primarylight flex py-2">
                <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xl">💬</span>
                    <span className="text-xs text-primary font-medium">Chats</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xl">👥</span>
                    <span className="text-xs text-gray-400">Groups</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xl">📞</span>
                    <span className="text-xs text-gray-400">Contacts</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xl">⚙️</span>
                    <span className="text-xs text-gray-400">Settings</span>
                </div>
            </div>
            {/* Top Bar */}
            <div className="bg-primary px-6 pt-10 pb-4 flex items-center justify-between">
            <h1 className="text-white text-xl font-semibold">VisioChat</h1>
            <div className="flex gap-3 items-center">
                <button className="text-white text-lg">🔍</button>
                <button
                onClick={() => navigate("/profile")}
                className="w-8 h-8 rounded-full bg-primarylight flex items-center justify-center text-primarydark text-sm font-semibold"
                >
                {auth.currentUser?.displayName?.charAt(0).toUpperCase()}
                </button>
            </div>
            </div>

        </div>
    )
}