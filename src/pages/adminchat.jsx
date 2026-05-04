import { useState } from "react"
import { useNavigate } from "react-router-dom"

const initialMessages = [
    {
        id: 1,
        text: "Exam starts at 10AM sharp. All the best!",
        sender: "admin",
        type: "announce",
        time: "9:00 AM",
    },
    {
        id: 2,
        text: "Thank you sir!",
        sender: "me",
        type: "normal",
        time: "9:02 AM",
    },
    {
        id: 3,
        text: "Ready!",
        sender: "member",
        senderName: "Priya",
        type: "normal",
        time: "9:03 AM",
    },
    {
        id: 4,
        text: "This message is not visible to you",
        sender: "admin",
        type: "hidden",
        time: "10:01 AM",
    },
    {
        id: 5,
        text: "Good luck everyone!",
        sender: "admin",
        type: "normal",
        time: "10:02 AM",
    },
]

export default function MemberChat() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState("")

    const sendMessage = () => {
        if (!input.trim()) return
        const newMsg = {
            id: messages.length + 1,
            text: input,
            sender: "me",
            type: "normal",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        }
        setMessages([...messages, newMsg])
        setInput("")
    }

    return (
        <div className="min-h-screen bg-primarylight flex flex-col">

            {/* Top Bar */}
            <div className="bg-primary px-4 pt-10 pb-3 flex items-center gap-3">
                <button onClick={() => navigate("/chats")} className="text-white text-lg">
                    ←
                </button>
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-white text-xs font-semibold">
                    CG
                </div>
                <div className="flex-1">
                    <div className="text-white text-sm font-semibold">Class Group</div>
                    <div className="text-muted text-xs">12 members · Member view</div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-3 py-4 flex flex-col gap-3 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id}>

                        {/* Announcement */}
                        {msg.type === "announce" && (
                            <div className="bg-primarydark bg-opacity-10 border-l-4 border-primarydark rounded-xl px-4 py-3">
                                <div className="text-xs text-primarydark font-semibold mb-1">
                                    📢 Announcement
                                </div>
                                <div className="text-primarydark text-sm">{msg.text}</div>
                                <div className="text-muted text-xs mt-1">{msg.time}</div>
                            </div>
                        )}

                        {/* Hidden Message */}
                        {msg.type === "hidden" && (
                            <div className="flex flex-col items-start">
                                <div className="border border-dashed border-muted bg-white rounded-2xl px-4 py-2 max-w-xs">
                                    <div className="text-muted text-sm italic">
                                        🔒 This message is not visible to you
                                    </div>
                                    <div className="text-muted text-xs mt-1">{msg.time}</div>
                                </div>
                            </div>
                        )}

                        {/* Other Member Message */}
                        {msg.sender === "member" && msg.type === "normal" && (
                            <div className="flex flex-col items-start">
                                <div className="text-xs text-gray-400 mb-1 ml-1">
                                    {msg.senderName}
                                </div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs shadow-sm">
                                    <div className="text-primarydark text-sm">{msg.text}</div>
                                    <div className="text-muted text-xs mt-1">{msg.time}</div>
                                </div>
                            </div>
                        )}

                        {/* Admin Message */}
                        {msg.sender === "admin" && msg.type === "normal" && (
                            <div className="flex flex-col items-start">
                                <div className="text-xs text-gray-400 mb-1 ml-1">Admin</div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs shadow-sm">
                                    <div className="text-primarydark text-sm">{msg.text}</div>
                                    <div className="text-muted text-xs mt-1">{msg.time}</div>
                                </div>
                            </div>
                        )}

                        {/* My Message */}
                        {msg.sender === "me" && (
                            <div className="flex flex-col items-end">
                                <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs shadow-sm">
                                    <div className="text-white text-sm">{msg.text}</div>
                                    <div className="text-primarylight text-xs mt-1 opacity-70">
                                        {msg.time}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="bg-white px-3 py-3 flex items-center gap-2">
                <button className="text-muted text-xl">📎</button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a reply..."
                    className="flex-1 bg-primarylight rounded-full px-4 py-2 text-sm text-primarydark outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg hover:opacity-90 transition"
                >
                    ➤
                </button>
            </div>

        </div>
    )
}