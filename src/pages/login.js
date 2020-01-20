import Button from '../components/button.js';
import Input from '../components/input.js';

function loginRegisteredUser() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.password-input').value;
  window.auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      if (cred.user) {
        window.location = '#feed';
      }
    }).catch(() => {
      const errorMessageField = document.getElementById('errorMessage');
      errorMessageField.textContent = 'Email e/ou senha inválidos.';
      document.querySelector('.email-input').addEventListener('focus', () => {
        errorMessageField.textContent = '';
      });
    });
}

function signInWithAccount(provider) {
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      window.db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.data()) {
          window.location.hash = '#feed';
        } else {
          window.db.collection('users').doc(user.uid).set({
            name: user.displayName,
            biography: 'Fale de você, seus gostos, plantas favoritas, etc.',
          });
          window.location.hash = '#feed';
        }
      });
    });
}

function loginGoogleUser() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithAccount(provider);
}

function Login() {
  const userLogin = `
  ${Input({
    type: 'email',
    class: 'email-input',
    placeholder: 'E-mail',
    value: '',
  })}
  ${Input({
    type: 'password',
    class: 'password-input',
    placeholder: 'Senha',
    value: '',
  })}
  ${Button({
    class: 'btn btn-gray',
    id: 'btn-log-in',
    onclick: loginRegisteredUser,
    title: 'ENTRAR',
  })}
  ${Button({
    id: 'authGoogleButton',
    class: 'btn-google',
    onclick: loginGoogleUser,
    title: '<span class="icon-google"></span><span class="button-text-google">Entrar com Google</span>',
  })}
  `;
  const template = `
  <article class='login-page'>
  <img class='login-img' src="./img/logo.png">
  <form class="form-content-login">
    <h1 class="horta-urbana">HORTA URBANA</h1> 
    ${userLogin}
    <div id="errorMessage" class="error-message"></div>
    <p>AINDA NÃO É MEMBRO? 
      <a href="#signup">CADASTRE-SE!</a>
    </p> 
  </form>
  </article>
  `;
  return template;
}

export default Login;

window.signInWithAccount = signInWithAccount;
