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
    apiKey: "AIzaSyAMYR89DaWshLi9Q3DzlOfd6-zERrlk-Dg",
    authDomain: "ic2025-4d32e.firebaseapp.com",
    projectId: "ic2025-4d32e",
    storageBucket: "ic2025-4d32e.firebasestorage.app",
    messagingSenderId: "614606671675",
    appId: "1:614606671675:web:a92cc69855fb3d7568f11e"
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
