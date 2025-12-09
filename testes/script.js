const btnProsseguir = document.getElementById('btn-prosseguir');
const btnVoltar = document.getElementById('btn-voltar');
const tela = document.getElementById('telaFlutuante');

btnProsseguir.addEventListener('click', () => {
    tela.classList.add('active');
});

btnVoltar.addEventListener('click', () => {
    tela.classList.remove('active');
});
