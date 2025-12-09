
const form1 = document.getElementById("cadform");
const form2 = document.getElementById("cadflutu");

const btnProsseguir = document.getElementById("submitBtn");
const btnVoltar = document.getElementById("submitBtn2");
const btnCadastrar = document.getElementById("submitBtn1");

// A tela flutuante eh essa aqui
const tela = form2;


// ----------------------
// tela flutuante
// ----------------------
btnProsseguir.addEventListener('click', (e) => {
    e.preventDefault();
    tela.classList.add('show');
});


// ----------------------
// Voltar pro o form 1
// ----------------------
btnVoltar.addEventListener('click', (e) => {
    e.preventDefault();
    tela.classList.remove('show'); 
});


// ----------------------
// Enviar 
// ----------------------
btnCadastrar.addEventListener("click", async (event) => {
    event.preventDefault();

    // Coleta os dados
    const dados = {
        nome_completo: document.getElementById("nome_completo").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        cep: document.getElementById("cep").value,
        bairro: document.getElementById("bairro").value,
        endereco: document.getElementById("endereco").value,
        senha: document.getElementById("senha").value
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/api/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (resultado.status === "ok") {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        } else {
            alert(resultado.mensagem);
        }

    } catch (erro) {
        alert("Erro ao conectar com o servidor.");
        console.error(erro);
    }
});
