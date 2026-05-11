import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { auth } from "../firebase/config"
import { sendMessage, listenMessages } from "../firebase/firestore"

export default function AdminChat() {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [visibility, setVisibility] = useState("everyone")
  const [isAnnounce, setIsAnnounce] = useState(false)
  const [isTimed, setIsTimed] = useState(false)
  const [showShare, setShowShare] = useState(false)
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
      type: isAnnounce ? "announce" : "normal",
      visibility: visibility,
      timed: isTimed,
    })
    setInput("")
  }

  const inviteLink = `${window.location.origin}/join/${groupId}`

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert("Link copied!")
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
          <div className="text-white text-sm font-semibold">Class Group</div>
          <div className="text-muted text-xs">Admin view</div>
        </div>
        {/* Invite Button */}
        <button
          onClick={() => setShowShare(true)}
          className="text-white text-xs border border-white px-3 py-1 rounded-full"
        >
          🔗 Invite
        </button>
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

            {/* My Message */}
            {msg.senderId === user.uid && msg.type !== "announce" && (
              <div className="flex flex-col items-end">
                <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs shadow-sm">
                  <div className="text-white text-sm">{msg.text}</div>
                  <div className="flex items-center justify-between gap-3 mt-1">
                    <span className="text-primarylight text-xs opacity-70">
                      {msg.createdAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="text-primarylight text-xs opacity-70">
                      {msg.timed ? "⏰ Timed" : msg.visibility === "selected" ? "🔒 Selected" : "👁️ Everyone"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Other Member Message */}
            {msg.senderId !== user.uid && msg.type !== "announce" && (
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

      {/* Admin Controls */}
      <div className="bg-white border-t border-primarylight px-4 py-2">
        <div className="text-xs text-primarydark font-semibold mb-2">Admin Controls</div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="text-xs border border-muted rounded-full px-3 py-1 text-primarydark bg-primarylight outline-none"
          >
            <option value="everyone">👁️ Everyone</option>
            <option value="selected">🔒 Selected only</option>
          </select>
          <button
            onClick={() => setIsAnnounce(!isAnnounce)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              isAnnounce ? "bg-primarydark text-white border-primarydark" : "bg-primarylight text-primarydark border-muted"
            }`}
          >
            📢 Announce
          </button>
          <button
            onClick={() => setIsTimed(!isTimed)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              isTimed ? "bg-primarydark text-white border-primarydark" : "bg-primarylight text-primarydark border-muted"
            }`}
          >
            ⏰ Timed
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white px-3 py-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-primarylight rounded-full px-4 py-2 text-sm text-primarydark outline-none"
        />
        <button
          onClick={handleSend}
          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg"
        >
          ➤
        </button>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-md">

            <div className="text-primarydark font-semibold text-base mb-1">
              Invite Members
            </div>
            <div className="text-muted text-xs mb-4">
              Share this link to invite people to your group
            </div>

            {/* Link Box */}
            <div className="bg-primarylight rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
              <div className="flex-1 text-primarydark text-xs truncate">
                {inviteLink}
              </div>
              <button
                onClick={copyLink}
                className="text-primary text-xs font-semibold flex-shrink-0"
              >
                Copy
              </button>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-3 gap-3 mb-4">

              {/* WhatsApp */}
              <button
                onClick={() => window.open(`https://wa.me/?text=Join my group on VisioChat! ${inviteLink}`)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100"
              >
                <span className="text-2xl">📱</span>
                <span className="text-xs text-green-700 font-medium">WhatsApp</span>
              </button>

              {/* SMS */}
              <button
                onClick={() => window.open(`sms:?body=Join my group on VisioChat! ${inviteLink}`)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100"
              >
                <span className="text-2xl">💬</span>
                <span className="text-xs text-blue-700 font-medium">SMS</span>
              </button>

              {/* Email */}
              <button
                onClick={() => window.open(`mailto:?subject=Join my VisioChat group&body=Join my group on VisioChat! ${inviteLink}`)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-primarylight border border-muted"
              >
                <span className="text-2xl">📧</span>
                <span className="text-xs text-primarydark font-medium">Email</span>
              </button>

            </div>

            {/* Close */}
            <button
              onClick={() => setShowShare(false)}
              className="w-full border border-muted text-muted font-medium py-3 rounded-full text-sm"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  )
}