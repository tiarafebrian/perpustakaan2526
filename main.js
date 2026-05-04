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
const judulbukuCollection = collection(db, "judulbuku")

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
        // redirect, 
        window.location.href = "admin.html"
    } else {
        document.getElementById("status").innerText = "Username atau password salah"
    }
}

// fungsi untuk logout
export function logout() {
    // hapus status login dari localStorage
    localStorage.removeItem("isLogin")
    
    // fungsi untuk menampilkan daftar judulbuku
export async function daftarjudulbuku() {

    // ambil snapshot data dari koleksi judulbuku
    const snapshot = await getDocs(judulbukuCollection)
    
    // ambil elemen tabel data
    const tabel = document.getElementById('tabelData')
    
    // kosongkan isi tabel nya
    tabel.innerHTML = ""
    
    // loop setiap dokumen dalam snapshot
    snapshot.forEach((doc) => {
        // variabel untuk menyimpan data
        const data = doc.data()
        const id = doc.id
        
        // buat elemen kolom untuk nomor urut
        
        
        // buat elemen baris baru
        const baris = document.createElement("tr")
        const nomorUrut = document.createElement("td")
        nomorUrut.textContent = tabel.rows.length + 1
        // buat elemen kolom untuk judulbuku
        const kolomjudulbuku = document.createElement("td")
        kolomjudulbuku.textContent = data.judulbuku
        
        // buat elemen untuk kolom penulis 
        const kolompenulis = document.createElement("td")
        kolompenulis.textContent = data.penulis
        
        // buat elemen kolom untuk penerbit
        const kolompenerbit = document.createElement('td')
        kolompenerbit.textContent = data.penerbit
        
        // buat elemen kolom untuk aksi
        const kolomaksi = document.createElement('td')
        
        // tombol judulbuku
        // tombol edit
        const tombolEdit = document.createElement('a')
        tombolEdit.textContent = 'Edit'
        tombolEdit.href = 'edit.html?id=' + id
        tombolEdit.className = 'button edit'
        
        // tombol hapus
        const tombolHapus = document.createElement('button')
        tombolHapus.textContent = 'Hapus'
        tombolHapus.className = 'button delete'
        tombolHapus.onclick = async () => {
            await hapusjudulbuku(id)
        }
        
        //tambahkan elemen ke dalam kolom aksi
        kolomaksi.appendChild(tombolEdit)
        kolomaksi.appendChild(tombolHapus)
        
        // tambahkan kolom ke dalam baris
        baris.appendChild(nomorUrut)
        baris.appendChild(kolomjudulbuku)
        baris.appendChild(kolompenulis)
        baris.appendChild(kolompenerbit)
        baris.appendChild(kolomaksi)
        
        // tambahkan baris ke alam tabel
        tabel.appendChild(baris)
        
    })
}

//fungsi untuk menambahkan judulbuku baru
export async function tambahbuku(data) {
  //ambil nilai dari from
  const judulbuku = document.getElementById('judulbuku').value
  const penerbit = document.getElementById('penerbit').value
  const stok = document.getElementById('stok').value
  
  // tambahkan data ke firestore
  await addDoc(judulbukuCollection, {
    judulbuku: judulbuku,
    penerbit: penerbit,
    stok: stok
  })
  
  // alihkan ke halaman daftar baranh
  window.location.href = 'daftar.html'
}

    // redirect ke halaman login
    window.location.href = "login.html"
}
