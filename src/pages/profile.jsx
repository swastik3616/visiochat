import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updateProfile, signOut } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { auth, storage, db } from "../firebase/config"

export default function Profile() {
  const navigate = useNavigate()
  const user = auth.currentUser
  const [name, setName] = useState(user?.displayName || "")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "")
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setPhone(data.phone || "")
        setRole(data.role || "student")
        setPhotoURL(data.photoURL || user?.photoURL || "")
      }
    }
    fetchUser()
  }, [])

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const storageRef = ref(storage, `profiles/${user.uid}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setPhotoURL(url)
      await updateProfile(user, { photoURL: url })
      await updateDoc(doc(db, "users", user.uid), { photoURL: url })
    } catch (err) {
      console.log("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!name.trim()) return
    setLoading(true)
    try {
      await updateProfile(user, { displayName: name })
      await updateDoc(doc(db, "users", user.uid), {
        name: name,
        phone: phone,
        role: role,
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.log("Update error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top Bar */}
      <div className="bg-primary px-6 pt-10 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/chats")} className="text-white text-lg">←</button>
        <h1 className="text-white text-lg font-semibold">My Profile</h1>
      </div>

      {/* Profile Photo */}
      <div className="bg-primary pb-8 flex flex-col items-center gap-3">
        <div className="relative">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-primarylight"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primarylight flex items-center justify-center text-primarydark text-3xl font-semibold border-4 border-white">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Upload Button */}
          <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md">
            <span className="text-sm">📷</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>
        {uploading && (
          <div className="text-muted text-xs">Uploading photo...</div>
        )}
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-6 flex flex-col gap-5">

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-xs px-4 py-3 rounded-xl">
            ✅ Profile updated successfully!
          </div>
        )}

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-primarydark text-sm font-medium">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-primarydark text-sm font-medium">Phone number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            className="border border-muted rounded-xl px-4 py-3 text-sm text-primarydark bg-primarylight outline-none focus:border-primary"
          />
        </div>

        {/* Email - readonly */}
        <div className="flex flex-col gap-1">
          <label className="text-primarydark text-sm font-medium">Email address</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="border border-muted rounded-xl px-4 py-3 text-sm text-gray-400 bg-gray-50 outline-none cursor-not-allowed"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2">
          <label className="text-primarydark text-sm font-medium">I am a</label>
          <div className="flex gap-3">
            <button
              onClick={() => setRole("teacher")}
              className={`flex-1 border-2 font-medium py-2 rounded-xl text-sm transition ${
                role === "teacher"
                  ? "border-primary bg-primarylight text-primarydark"
                  : "border-muted text-muted"
              }`}
            >
              👨‍🏫 Teacher
            </button>
            <button
              onClick={() => setRole("student")}
              className={`flex-1 border-2 font-medium py-2 rounded-xl text-sm transition ${
                role === "student"
                  ? "border-primary bg-primarylight text-primarydark"
                  : "border-muted text-muted"
              }`}
            >
              👨‍🎓 Student
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full border border-red-300 text-red-500 font-medium py-3 rounded-full text-sm hover:bg-red-50 transition"
        >
          Logout
        </button>

      </div>
    </div>
  )
}