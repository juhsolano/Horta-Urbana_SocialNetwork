function Input(props) {
  const template = `
    <input type=${props.type} id=${props.id} class=${props.class} placeholder=${props.placeholder} value="${props.value}" required>
    `;
  return template;
}

export default Input;
