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
