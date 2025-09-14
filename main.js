let currentGenre = "all";

function renderGames(filter = "", genre = currentGenre, chunkSize = 40) {
  const container = document.getElementById("gameGrid");
  container.innerHTML = "";
  
  const filtered = games
    .filter(game => game.title.toLowerCase().includes(filter.toLowerCase()))
    .filter(game => genre === "all" || game.genre === genre);

  let loaded = 0;

  function loadChunk() {
    const slice = filtered.slice(loaded, loaded + chunkSize);
    slice.forEach(game => {
      container.innerHTML += `
        <a href="${game.url}" class="game-card" target="_blank">
          <img src="${game.img}" alt="${game.title}">
          <h2>${game.title}</h2>
        </a>
      `;
    });
    loaded += chunkSize;
  }

  // first chunk
  loadChunk();

  // load more on scroll
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadChunk();
    }
  };
}

function setGenre(g) {
  currentGenre = g;
  renderGames(document.getElementById("search").value, currentGenre);
}

document.getElementById("search").addEventListener("input", e => {
  renderGames(e.target.value, currentGenre);
});

renderGames();
