import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { getAllUsers, createGroup } from "../firebase/firestore"

export default function CreateGroup() {
    const navigate = useNavigate()
    const [groupName, setGroupName] = useState("")
    const [users, setUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const user = auth.currentUser

    useEffect(() => {
        const fetchUsers = async () => {
            const all = await getAllUsers()
            setUsers(all.filter((u) => u.id !== user.uid))
        }
        fetchUsers()
    }, [])

    const toggleUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }

    const handleCreate = async () => {
        if (!groupName.trim()) return
        setLoading(true)
        await createGroup(groupName, user.uid, selectedUsers)
        navigate("/chats")
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Bar */}
            <div className="bg-primary px-6 pt-10 pb-4 flex items-center gap-3">
                <button onClick={() => navigate("/chats")} className="text-white text-lg">←</button>
                <h1 className="text-white text-lg font-semibold">Create Group</h1>
            </div>

            <div className="flex-1 px-6 pt-6 flex flex-col gap-5">

                {/* Group Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">Group name</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g. Class Group, Team Alpha"
                        className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                    />
                </div>

                {/* Members */}
                <div>
                    <label className="text-primarydark text-sm font-medium">
                        Add members ({selectedUsers.length} selected)
                    </label>
                    <div className="mt-3 flex flex-col gap-2">
                        {users.length === 0 ? (
                            <div className="text-muted text-sm text-center py-4">
                                No other users found
                            </div>
                        ) : (
                            users.map((u) => (
                                <div
                                    key={u.id}
                                    onClick={() => toggleUser(u.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition ${selectedUsers.includes(u.id)
                                            ? "border-primary bg-primarylight"
                                            : "border-muted bg-white"
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                                        {u.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-primarydark text-sm font-medium">{u.name}</div>
                                        <div className="text-muted text-xs">{u.role}</div>
                                    </div>
                                    {selectedUsers.includes(u.id) && (
                                        <span className="text-primary text-lg">✓</span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* Create Button */}
            <div className="px-6 py-4">
                <button
                    onClick={handleCreate}
                    disabled={loading || !groupName.trim()}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Group"}
                </button>
            </div>

        </div>
    )
}