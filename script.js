// Countdown
const electionDate = new Date('2026-04-12T07:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = electionDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div class="time"><span>${days}</span><small>NAP</small></div>
        <div class="time"><span>${hours}</span><small>ÓRA</small></div>
        <div class="time"><span>${minutes}</span><small>PERC</small></div>
        <div class="time"><span>${seconds}</span><small>MÁSODPERC</small></div>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Friss Hírek betöltése (rss2json)
async function loadNews() {
    const feeds = [
        "https://telex.hu/rss",
        "https://444.hu/feed",
        "https://hvg.hu/rss";
        
    const apiKey = '3cpdrxzylqoemzpcsvhewnssfmtlagkonkh942of';
    // ...

    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}&api_key=${apiKey}`);
    ];

    let allItems = [];

    for (let feed of feeds) {
        try {
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`);
            const data = await res.json();
            if (data.items) allItems = allItems.concat(data.items.slice(0, 4));
        } catch(e) {}
    }

    // Rendezés dátum szerint
    allItems.sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate));

    const container = document.getElementById('news-container');
    container.innerHTML = '';

    allItems.slice(0, 9).forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <div class="source">${item.author || 'Hírportál'} • ${new Date(item.pubDate).toLocaleDateString('hu-HU')}</div>
        `;
        card.onclick = () => window.open(item.link, '_blank');
        container.appendChild(card);
    });
}

loadNews();
setInterval(loadNews, 15 * 60 * 1000); // 15 percenként frissül