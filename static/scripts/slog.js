
(function(){

  const form = document.getElementById('Loginform');
  const emailPhoneInput = document.getElementById('emailPhone');
  const passwordInput = document.getElementById('password');
  const messageEl = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !emailPhoneInput || !passwordInput || !messageEl) {
    console.error('Elementos do formulário não encontrados — verifique IDs no HTML.');
    return;
  }

  function showMessage(text, isError = true) {
    messageEl.textContent = text;
    messageEl.style.color = isError ? '#d93025' : '#0a7a34';
  }

  function validateEmailOrPhone(value) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{8,15}$/; 
    return emailRegex.test(value) || phoneRegex.test(value);
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    showMessage('', true);

    const emailPhone = emailPhoneInput.value.trim();
    const password = passwordInput.value;


    if (!emailPhone) {
      showMessage('Preencha todos os campos para continuar.');
      emailPhoneInput.focus();
      return;
    }

    if (!validateEmailOrPhone(emailPhone)) {
      showMessage('Digite um e-mail válido (ex: nome@ex.com) ou telefone com apenas números (8–15 dígitos).');
      emailPhoneInput.focus();
      return;
    }

    if (!password || password.length < 4) {
      showMessage('A senha deve ter pelo menos 4 caracteres.');
      passwordInput.focus();
      return;
    }

    showMessage('Login feito com sucesso!', false);

  
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                emailPhone: emailPhoneInput.value.trim(), 
                password: passwordInput.value 
            })
        });

    const data = await response.json();

    if (response.ok) {
        showMessage(data.mensagem, false);
    } else {
        showMessage(data.mensagem, true);
    }

        } catch (error) {
            showMessage('Erro de conexão com o servidor.', true);
            console.error(error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Entrar';
    }
  });
})();
