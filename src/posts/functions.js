import Button from '../components/button.js';
import Textarea from '../components/textarea.js';

function saveComment() {
  const newComment = document.querySelector('.textarea-comment').value;
  const idComment = newComment.replace(/\s/g, '');
  const datasetid = event.target.dataset.id;
  window.db
    .collection('users')
    .doc(window.auth.currentUser.uid)
    .get()
    .then((doc) => {
      const userName = doc.data().name;
      const id = doc.id;
      const docPost = window.db.collection('posts').doc(datasetid);
      docPost
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            userName,
            newComment,
            id,
            idComment,
          }),
        });
    });
}

function cancelComment() {
  const datasetid = event.target.dataset.id;
  document.getElementById(datasetid).querySelector('.comment-container').innerHTML = '';
}

function AddComment(postId) {
  const commentArea = `
    ${Textarea({
    class: 'textarea-comment edit-textarea',
    placeholder: 'Escreva um comentário',
    value: '',
  })}
    <div>
    ${Button({
    type: 'button',
    class: 'btn',
    id: 'btn-comment-cancel',
    dataId: postId,
    onclick: cancelComment,
    title: 'CANCELAR',
  })}
    ${Button({
    type: 'button',
    class: 'btn btn-gray',
    id: 'btn-comment-post',
    dataId: postId,
    onclick: saveComment,
    title: 'POSTAR',
  })}
</div>
`;
  const createSection = document.getElementById(postId).querySelector('.comment-container');
  createSection.innerHTML = `${commentArea}`;
}

function DeleteComment(postid, commentid) {
  if (!window.confirm('Tem certeza que deseja excluir esse comentário?')) return;
  const postDoc = window.db.collection('posts').doc(postid);
  postDoc
    .get()
    .then((d) => {
      const arrComments = d.data().comments;
      const targetObj = arrComments.find(c => c.idComment === commentid);
      postDoc.update({
        comments: firebase.firestore.FieldValue.arrayRemove(targetObj),
      });
    });
}

function PrivacyPost(postId, option) {
  const docPost = window.db.collection('posts').doc(postId);
  docPost.update({
    privacy: option,
  });
}

function saveEdit(event) {
  const id = event.target.dataset.id;
  const postText = document.getElementById(id).querySelector('.post-text');
  const buttonPencil = document.getElementById(id).querySelector('.edit-post');
  const editedText = document.querySelector('.edit-textarea').value;
  postText.innerHTML = `
  <p class='post-text'>${editedText}</p>
  `;
  window.db
    .collection('posts')
    .doc(id)
    .update({
      text: editedText,
    });
  document.getElementById(id).querySelector('.edit-button').innerHTML = '';
  buttonPencil.style.display = 'block';
}

function cancelEdit(event) {
  const id = event.target.dataset.id;
  const postText = document.getElementById(id).querySelector('.post-text');
  const buttonPencil = document.getElementById(id).querySelector('.edit-post');
  const text = postText.textContent.trim();
  postText.innerHTML = `
  <p class='post-text'>${text}</p>
  `;
  document.getElementById(id).querySelector('.edit-button').innerHTML = '';
  buttonPencil.style.display = 'block';
}

function EditPost(event) {
  const postId = event.target.dataset.id;
  console.log(postId);
  // const id = postId;
  const postText = document.getElementById(postId).querySelector('.post-text');
  const button = document.getElementById(postId).querySelector('.edit-button');
  const buttonPencil = document.getElementById(postId).querySelector('.edit-post');
  const text = postText.textContent;
  postText.innerHTML = `
  ${window.textarea.component({
    class: 'edit-textarea',
    id: 'edit-textarea',
    placeholder: '',
    value: text,
  })}
  `;
  button.innerHTML = `
  ${window.button.component({
    id: 'btn-cancel',
    class: 'btn cancel-btn',
    dataId: postId,
    onclick: window.cancelEdit,
    title: 'CANCELAR',
  })}
  ${window.button.component({
    id: 'btn-save',
    class: 'btn save-btn btn-gray',
    dataId: postId,
    onclick: window.saveEdit,
    title: 'SALVAR',
  })}
  `;
  buttonPencil.style.display = 'none';
}

async function LikePost(postId) {
  const postsCollection = window.db.collection('posts');
  const actualPost = await postsCollection.doc(postId).get();

  postsCollection.doc(postId).get().then((doc) => {
    const arrUsers = doc.data().user_likes;
    const thisUser = arrUsers.includes(window.auth.currentUser.uid);

    if (!thisUser) {
      postsCollection.doc(postId).update({
        likes: actualPost.data().likes + 1,
        user_likes: firebase.firestore.FieldValue.arrayUnion(window.auth.currentUser.uid),
      });
    }
  });
}

function DeletePost(event) {
  const postId = event.target.dataset.id;
  if (!confirm('Tem certeza que deseja excluir essa publicação?')) return;
  window.db
    .collection('posts')
    .doc(postId)
    .delete()
    .then();
}

function GetFirstLetter(userName) {
  return userName[0];
}

export {
  AddComment,
  DeleteComment,
  PrivacyPost,
  EditPost,
  LikePost,
  DeletePost,
  GetFirstLetter,
};

window.DeleteComment = DeleteComment;
window.cancelEdit = cancelEdit;
window.saveEdit = saveEdit;