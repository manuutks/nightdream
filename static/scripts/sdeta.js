const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const produto = produtos[id];

if (produto) {
  document.getElementById("nome-produto").textContent = produto.nome;
  document.getElementById("descricao-produto").textContent = produto.descricao;
  document.getElementById("preco-produto").textContent = produto.preco;
  document.getElementById("imagem-produto").src = produto.imagem;
} else {
  document.querySelector(".detalhes-produto").innerHTML = "<p>Produto não encontrado.</p>";
}
