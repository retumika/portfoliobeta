import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { firebaseConfig } from './env.js';


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

    if(!title || !content) {
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