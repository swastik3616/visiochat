import { db, auth } from "./config"
import {
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    onSnapshot,
    query,
    orderBy,
    where,
    serverTimestamp,
} from "firebase/firestore"

// Save user to Firestore after signup
export const saveUser = async (user, role, phone) => {
    await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        phone: phone || "",
        role: role || "student",
        createdAt: serverTimestamp(),
    })
}

// Find user by phone number
export const findUserByPhone = async (phone) => {
    const q = query(collection(db, "users"), where("phone", "==", phone))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
}

// Get all users
export const getAllUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"))
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Create a group
export const createGroup = async (groupName, adminId, memberIds) => {
    const groupRef = await addDoc(collection(db, "groups"), {
        name: groupName,
        adminId: adminId,
        members: [adminId, ...memberIds],
        createdAt: serverTimestamp(),
    })
    return groupRef.id
}

// Get groups for a user
export const getUserGroups = async (userId) => {
    const snapshot = await getDocs(collection(db, "groups"))
    const groups = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return groups.filter((g) => g.members.includes(userId))
}

// Send message
export const sendMessage = async (groupId, message) => {
    await addDoc(collection(db, "messages", groupId, "chats"), {
        ...message,
        createdAt: serverTimestamp(),
    })
}

// Listen to messages in real time
export const listenMessages = (groupId, callback) => {
    const q = query(
        collection(db, "messages", groupId, "chats"),
        orderBy("createdAt", "asc")
    )
    return onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        callback(msgs)
    })
}