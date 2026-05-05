import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { findUserByPhone, createGroup } from "../firebase/firestore"

export default function CreateGroup() {
    const navigate = useNavigate()
    const [groupName, setGroupName] = useState("")
    const [phoneInput, setPhoneInput] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [error, setError] = useState("")
    const [searching, setSearching] = useState(false)
    const [loading, setLoading] = useState(false)
    const user = auth.currentUser

    const handleAddByPhone = async () => {
        if (!phoneInput.trim()) return
        setSearching(true)
        setError("")
        try {
            const found = await findUserByPhone(phoneInput.trim())
            if (!found) {
                setError("No user found with this phone number!")
                return
            }
            if (found.id === user.uid) {
                setError("You are already the admin!")
                return
            }
            if (selectedUsers.find((u) => u.id === found.id)) {
                setError("User already added!")
                return
            }
            setSelectedUsers([...selectedUsers, found])
            setPhoneInput("")
        } catch (err) {
            setError("Something went wrong. Try again!")
        } finally {
            setSearching(false)
        }
    }

    const removeUser = (userId) => {
        setSelectedUsers(selectedUsers.filter((u) => u.id !== userId))
    }

    const handleCreate = async () => {
        if (!groupName.trim()) {
            setError("Please enter group name!")
            return
        }
        setLoading(true)
        const memberIds = selectedUsers.map((u) => u.id)
        await createGroup(groupName, user.uid, memberIds)
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

                {/* Add by Phone */}
                <div className="flex flex-col gap-1">
                    <label className="text-primarydark text-sm font-medium">
                        Add member by phone number
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="tel"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddByPhone()}
                            placeholder="+91 98765 43210"
                            className="flex-1 border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
                        />
                        <button
                            onClick={handleAddByPhone}
                            disabled={searching}
                            className="bg-primary text-white px-4 rounded-xl text-sm font-medium disabled:opacity-60"
                        >
                            {searching ? "..." : "Add"}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="text-red-500 text-xs mt-1">{error}</div>
                    )}
                </div>

                {/* Selected Members */}
                {selectedUsers.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label className="text-primarydark text-sm font-medium">
                            Members added ({selectedUsers.length})
                        </label>
                        {selectedUsers.map((u) => (
                            <div
                                key={u.id}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary bg-primarylight"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                                    {u.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="text-primarydark text-sm font-medium">{u.name}</div>
                                    <div className="text-muted text-xs">{u.phone}</div>
                                </div>
                                <button
                                    onClick={() => removeUser(u.id)}
                                    className="text-red-400 text-sm font-medium"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* Create Button */}
            <div className="px-6 py-4">
                <button
                    onClick={handleCreate}
                    disabled={loading || !groupName.trim()}
                    className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-60"
                >
                    {loading ? "Creating..." : `Create Group${selectedUsers.length > 0 ? ` with ${selectedUsers.length} members` : ""}`}
                </button>
            </div>

        </div>
    )
}