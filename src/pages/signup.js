import Button from '../components/button.js';
import Input from '../components/input.js';

function newUser() {

  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  const name = document.querySelector('.name-input').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((resp) => {
        if (resp.user) {
          resp.user.updateProfile({
            displayName: name
          })
          .then(() => {
            db.collection('users').doc(resp.user.uid).set({
              name: name
            })
            .then(() => {
              window.location = '#login';
            });
          });
         
        }
    }).catch((error) => {
      const errorMessage = error.message;
      const errorMessageField = document.getElementById('errorMessageSignup');
      errorMessageField.textContent = errorMessage;
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
    class: 'btn btn-register',
    id: 'btn-new-user',
    onclick: newUser,
    title: 'Cadastrar',
  })}
  `;
  const template = `
  <header class="main-header">
    <h1>Bem vindo(a)!</h1>
  </header>
  <img src="./img/icon-pluto.png">
  <form class="form-content">
    <main class="register-input">
      <p class="register-text">Para realizar o cadastro, preencha as informações abaixo:</h1>
      ${userInfo}
      <div id="errorMessageSignup"></div>
    </main>
  </form>
  `;
  return template;
}

export default Signup;