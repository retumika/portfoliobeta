function showPage(pageId) {
    const pages = document.querySelectorAll('.page');//全ページ要素取得

    pages.forEach(page => {
    page.classList.remove('active');//全ページ非表示
    });

    document.getElementById(pageId).classList.add('active');//再度表示
}