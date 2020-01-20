function Icons(props) {
  const template = `
      <button class='${props.class}' data-id='${props.dataId}' onclick="button.handleClick(event, ${props.onclick})"></button>
      `;
  return template;
}

window.icons = {

  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
  component: Icons,
};

export default Icons;

// ${LoggedUserID === post.user_id ? window.icons.component({ title: 'excluir', dataId: postId, onclick: DeletePost }) : ''}
// ${LoggedUserID === post.user_id ? window.icons.component({
//   class: 'delete fa fa-trash',
//   dataId: postId,
//   onclick: DeletePost,
// }) : ''}