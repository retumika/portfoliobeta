import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


document.getElementById('post-date').valueAsDate = new Date();


window.login = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('post-section').classList.remove('hidden');
        alert("ログイン成功！");
    } catch (e) {
        alert("ログイン失敗：" + e.message);
    }
};


window.postDiary = async () => {
    const title = document.getElementById('post-title').value;
    const date = document.getElementById('post-date').value;
    const content = document.getElementById('post-content').value;

    if (!title || !content) {
        alert("入力が不足しています");
        return;
    }

    try {
        await addDoc(collection(db, "diaries"), {
            title: title,
            date: date,
            content: content,
            createdAt: new Date()
        });
        alert("投稿しました！");
        document.getElementById('post-title').value = "";
        document.getElementById('post-content').value = "";
    } catch (e) {
        alert("エラー：" + e.message);
    }
};