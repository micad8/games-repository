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
      // instead of <a href=...> we use a div with data-url
      container.innerHTML += `
        <div class="game-card" data-url="${game.url}">
          <img src="${game.img}" alt="${game.title}">
          <h2>${game.title}</h2>
        </div>
      `;
    });
    loaded += chunkSize;

    // attach click listeners for newly added cards
    document.querySelectorAll('.game-card').forEach(card => {
      card.onclick = () => {
        const url = card.getAttribute('data-url');
        window.open(
          url,
          '_blank',
          'width=1024,height=768,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no'
        );
      };
    });
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
