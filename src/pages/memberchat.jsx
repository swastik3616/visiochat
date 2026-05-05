import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { auth } from "../firebase/config"
import { sendMessage, listenMessages } from "../firebase/firestore"

export default function MemberChat() {
    const navigate = useNavigate()
    const { groupId } = useParams()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const bottomRef = useRef(null)
    const user = auth.currentUser

    useEffect(() => {
        const unsubscribe = listenMessages(groupId, (msgs) => {
            setMessages(msgs)
        })
        return () => unsubscribe()
    }, [groupId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return
        await sendMessage(groupId, {
            text: input,
            senderId: user.uid,
            senderName: user.displayName,
            type: "normal",
            visibility: "everyone",
        })
        setInput("")
    }

    return (
        <div className="min-h-screen bg-primarylight flex flex-col">

            {/* Top Bar */}
            <div className="bg-primary px-4 pt-10 pb-3 flex items-center gap-3">
                <button onClick={() => navigate("/chats")} className="text-white text-lg">←</button>
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-white text-xs font-semibold">
                    CG
                </div>
                <div className="flex-1">
                    <div className="text-white text-sm font-semibold">Group Chat</div>
                    <div className="text-muted text-xs">Member view</div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-3 py-4 flex flex-col gap-3 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id}>

                        {/* Announcement */}
                        {msg.type === "announce" && (
                            <div className="bg-primarydark bg-opacity-10 border-l-4 border-primarydark rounded-xl px-4 py-3">
                                <div className="text-xs text-primarydark font-semibold mb-1">📢 Announcement</div>
                                <div className="text-primarydark text-sm">{msg.text}</div>
                                <div className="text-muted text-xs mt-1">
                                    {msg.createdAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            </div>
                        )}

                        {/* Hidden Message */}
                        {msg.type === "normal" && msg.visibility === "selected" && msg.senderId !== user.uid && (
                            <div className="flex flex-col items-start">
                                <div className="border border-dashed border-muted bg-white rounded-2xl px-4 py-2 max-w-xs">
                                    <div className="text-muted text-sm italic">🔒 This message is not visible to you</div>
                                    <div className="text-muted text-xs mt-1">
                                        {msg.createdAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* My Message */}
                        {msg.senderId === user.uid && msg.type !== "announce" && (
                            <div className="flex flex-col items-end">
                                <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs shadow-sm">
                                    <div className="text-white text-sm">{msg.text}</div>
                                    <div className="text-primarylight text-xs mt-1 opacity-70">
                                        {msg.createdAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Other Member Normal Message */}
                        {msg.senderId !== user.uid && msg.type === "normal" && msg.visibility === "everyone" && (
                            <div className="flex flex-col items-start">
                                <div className="text-xs text-gray-400 mb-1 ml-1">{msg.senderName}</div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs shadow-sm">
                                    <div className="text-primarydark text-sm">{msg.text}</div>
                                    <div className="text-muted text-xs mt-1">
                                        {msg.createdAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-white px-3 py-3 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a reply..."
                    className="flex-1 bg-primarylight rounded-full px-4 py-2 text-sm text-primarydark outline-none"
                />
                <button
                    onClick={handleSend}
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg"
                >
                    ➤
                </button>
            </div>

        </div>
    )
}