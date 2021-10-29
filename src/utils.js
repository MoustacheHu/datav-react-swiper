const transformStyles = (data) => {
  const styleObj = {};
  Object.keys(data).forEach(type => {
    const value = data[type];
    switch (type) {
      case 'margin':
        styleObj.margin = `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
        break;
      case 'padding':
        styleObj.padding = `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
        break;
      case 'font':
        styleObj.fontSize = `${value.fontSize}px`;
        styleObj.color = value.color;
        break;
      case 'show':
        styleObj.display = value ? 'block': 'none';
        break;
      default:
        break;
    }
  });
  return styleObj;
};

export default transformStyles;
