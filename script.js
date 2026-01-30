const electionDate = new Date('2026-04-12T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = electionDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h2>A választás elmúlt!</h2>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();