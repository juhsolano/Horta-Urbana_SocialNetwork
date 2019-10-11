//página de cadastro: input nome, email e senha e botão de cadastro
import Button from '../components/button.js';
import Input from '../components/input.js';

function newUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const name = document.querySelector('.name-input').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function Signup() {
  const userInfo = `
    ${Input({
    type: 'text',
    class: 'name-input',
    placeholder: 'Nome',
  })}
    ${Input({
    type: 'email',
    class: 'email-input',
    placeholder: 'Email',
  })}
      ${Input({
    type: 'password',
    class: 'password-input',
    placeholder: 'Senha',
  })}
      ${Button({
    id: 'btn-new-user',
    onclick: newUser,
    title: 'Cadastrar',
  })}
  `;
  const template = `
  <h1>Bem vindo(a)!</h1>
  <p>Para realizar o cadastro, preencha as informações abaixo:</h1>
  <form>
  ${userInfo}
  </form>
  `;
  return template;
}

export default Signup;