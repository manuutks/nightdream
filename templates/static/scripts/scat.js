const catalogo = document.getElementById("catalogo");

if (catalogo && produtos) {
  for (let id in produtos) {
    const p = produtos[id];
    const card = document.createElement("a");
    card.href = `details.html?id=${id}`;
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="card-info">
        <h3>${p.nome}</h3>
        <p>${p.preco}</p>
      </div>
    `;
    catalogo.appendChild(card);
  }
} else {
  console.error("Erro: elemento #catalogo ou produtos não encontrados!");
}
