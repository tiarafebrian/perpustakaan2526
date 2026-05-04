// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    getDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyAoa6XVwvLudjkyHxzF2Q8Xp61BEaG8_Ho",
  authDomain: "insancemerlang-e829c.firebaseapp.com",
  projectId: "insancemerlang-e829c",
  storageBucket: "insancemerlang-e829c.firebasestorage.app",
  messagingSenderId: "544747474491",
  appId: "1:544747474491:web:be2b4a1553734a5c53961e"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const tanamanCollection = collection(db, "tanaman")

// fungsi untuk login
export async function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const q = query(
        collection(db, "users"),
        where("username", "==", username),
        where("password", "==", password)
    )

    const querySnapshot = await getDocs(collection(db, "users"))

    let ketemu = false

    querySnapshot.forEach((doc) => {
        const data = doc.data()

        if (data.username === username && data.password === password) {
            ketemu = true
        }
    })

    if (ketemu) {
        // simpan status login di localStorage
        localStorage.setItem("isLogin", "true")

        document.getElementById("status").innerText = "Login berhasil"
        // redirect
        window.location.href = "admin.html"
    } else {
        document.getElementById("status").innerText = "Username atau password salah"
    }
}

// fungsi untuk logout
export function logout() {
    // hapus status login dari localStorage
    localStorage.removeItem("isLogin")

    // redirect ke halaman login
    window.location.href = "login.html"
}
