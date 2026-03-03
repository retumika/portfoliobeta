import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrcK4mO10-c16ZLMxWvHOer00ml_6iy7A",
    authDomain: "portfolio001-b2897.firebaseapp.com",
    projectId: "portfolio001-b2897",
    storageBucket: "portfolio001-b2897.firebasestorage.app",
    messagingSenderId: "367472258585",
    appId: "1:367472258585:web:4773a4af05102faba30488"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadNews() {
    const newsList = document.getElementById('diary-list');
    try {
        const q = query(collection(db, "diaries"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        
        let html = "";
querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `
        <div class="news-item" style="margin-bottom: 20px; border-bottom: 1px solid #ffffff33; padding-bottom: 10px;">
            <h3 style="color: #00f7ff; margin: 5px 0;">${data.title}</h3>

            <small>${data.date}</small>

            <p>${data.content}</p>
        </div>
    `;
    });
        newsList.innerHTML = html || "<p>お知らせはありません。</p>";
    } catch (e) {
        console.error("Firebase読み込みエラー:", e);
        newsList.innerHTML = "<p>データの取得に失敗しました。</p>";
    }
}

window.showPage = function(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    if (pageId === 'diary') {
        loadNews();
    }
};