(function() {
  emailjs.init("cnMJXiulVXJR3xOld");
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_aye1mhp', 'template_gqykmsc', this)
    .then(function() {
      document.getElementById('status').textContent = "✅ Wiadomość została wysłana!";
    }, function(error) {
      document.getElementById('status').textContent = "❌ Błąd: " + error.text;
    });

  this.reset();
});

document.getElementById('open-form').addEventListener('click', () => {
  document.getElementById('contact-form').classList.remove('hidden');
});

document.getElementById('close-form').addEventListener('click', () => {
  document.getElementById('contact-form').classList.add('hidden');
});

let allGames = [];

async function fetchGamesByPlatform(platform) {
  const response = await fetch(`https://api.rawg.io/api/games?key=dcf3ee996a384ff08f7475422d571b3a&platforms=${platform}&page_size=10`);
  const data = await response.json();
  return data.results || [];
}

function setPlatform(platformName) {
  document.getElementById('games-list').innerHTML = "<p>⏳ Ładowanie gier...</p>";
  let platformMap = {
    "PlayStation": 18,
    "Xbox": 1,
    "Nintendo": 7,
    "PC": 4,
    "Mobile": 3
  };
  const platformId = platformMap[platformName];

  fetchGamesByPlatform(platformId).then(games => {
    allGames = games;
    displayGames(games);
  });
}

function displayGames(games) {
  const list = document.getElementById("games-list");
  list.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <h3>${game.name}</h3>
      <p>🎮 Platforma: ${game.platforms?.map(p => p.platform.name).join(', ') || "Brak"}</p>
      <p>💰 Płatność: <span class="${Math.random() > 0.5 ? "paid" : "free"}">${Math.random() > 0.5 ? "Płatna" : "Darmowa"}</span></p>
      <p>🏢 Wydawnictwo: ${game.publishers?.[0]?.name || "Nieznane"}</p>
    `;
    list.appendChild(card);
  });
}

function filterGames() {
  const input = document.getElementById('search').value.toLowerCase();
  const filtered = allGames.filter(g => g.name.toLowerCase().includes(input));
  displayGames(filtered);
}
