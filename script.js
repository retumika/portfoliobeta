import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

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

async function loadNews() {
    const newsList = document.getElementById('diary-list');
    try {
        const q = query(collection(db, "diaries"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        let html = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `
        <div class="news-item" style="margin-bottom: 20px; border-bottom: 1.0px solid #ffffff; padding-bottom: 20px;">
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


const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 247, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill();
    }
}


function init() {
    particlesArray = [];
    let numberOfParticles = 20;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();


window.showPage = function (pageId) {
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