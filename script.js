import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { firebaseConfig } from './env.js';

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