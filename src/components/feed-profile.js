// import Button from '../components/button.js';
// import Input from '../components/input.js';

// function FeedProfile(props) {
//   const template = `
//     <header class='${props.class}'>
//       ${Button}
//       <div class='${props.class}'>
//         <label for='${Input.props.id}'>
//           <div class='${props.class}'></div>
//         </label>
//         <p> Horta Urbana </p> 
//         <div class='${props.class}'>
//           <img src="./img/fruits.svg">
//         </div>
//       </div>
//       ${Button}
//       ${Input}
//       <div class='${props.class}'>
//           ${Button({
//     type: 'button',
//     class: 'btn profile-btn ',
//     id: 'btn-profile',
//     onclick: () => {
//       window.location = window.location.hash === '#feed';
//     },
//     title: 'Feed',
//   })}
//     ${Button({
//     type: 'button',
//     class: 'btn logout-btn ',
//     id: 'btn-log-out',
//     onclick: logOut,
//     title: 'Sair',
//   })}
//       </div>
//     </header>
//     <section id="printpost" class="print-post">
//       <ul class='post-list'>${props.function}</ul>
//     </section>
//     `;
//   return template;
// }

// export default FeedProfile;