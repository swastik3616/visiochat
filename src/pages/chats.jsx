import { useNavigate } from "react-router-dom"

const chatData = [
    {
        id: 1,
        name: "Class Group",
        avatar: "CG",
        lastMessage: "Admin: Results will be revealed at 3PM",
        time: "3:12 PM",
        unread: 3,
        isAdmin: true,
    },
    {
        id: 2,
        name: "Team Alpha",
        avatar: "TA",
        lastMessage: "You: Got it, will update shortly",
        time: "1:45 PM",
        unread: 0,
        isAdmin: false,
    },
    {
        id: 3,
        name: "HR Announcements",
        avatar: "HR",
        lastMessage: "Important: Holiday schedule updated",
        time: "Yesterday",
        unread: 1,
        isAdmin: false,
    },
    {
        id: 4,
        name: "Study Circle",
        avatar: "SC",
        lastMessage: "Admin: Next session on Sunday",
        time: "Mon",
        unread: 0,
        isAdmin: true,
    },
]

export default function Chats() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Bar */}
            <div className="bg-primary px-6 pt-10 pb-4 flex items-center justify-between">
                <h1 className="text-white text-xl font-semibold">VisioChat</h1>
                <div className="flex gap-4">
                    <button className="text-white text-lg">🔍</button>
                    <button className="text-white text-lg">⋮</button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3 bg-primarylight">
                <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full bg-white border border-muted rounded-full px-4 py-2 text-sm text-primarydark outline-none focus:border-primary"
                />
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {chatData.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() =>
                            navigate(chat.isAdmin ? `/chat/admin/${chat.id}` : `/chat/member/${chat.id}`)
                        }
                        className="flex items-center gap-3 px-4 py-3 border-b border-primarylight cursor-pointer hover:bg-primarylight transition"
                    >
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                            {chat.avatar}
                        </div>

                        {/* Chat Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className="text-primarydark font-medium text-sm">{chat.name}</span>
                                <span className="text-gray-400 text-xs">{chat.time}</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-gray-400 text-xs truncate pr-2">
                                    {chat.lastMessage}
                                </span>
                                {chat.unread > 0 && (
                                    <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FAB - New Group Button */}
            <button
                onClick={() => alert("Create new group!")}
                className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full text-2xl shadow-lg hover:opacity-90 transition flex items-center justify-center"
            >
                +
            </button>

            {/* Bottom Navigation */}
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

        </div>
    )
}