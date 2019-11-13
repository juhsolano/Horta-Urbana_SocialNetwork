function Icons(props) {
  const template = `
      <div class='${props.class}'></div>
      <div><span class='${props.class}'></span></div>
      <button class='${props.class}' data-id='${props.dataId}' onclick="button.handleClick(event, ${props.onclick})">${props.title}</button>
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