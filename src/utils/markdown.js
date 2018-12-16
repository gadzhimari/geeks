import showdown from 'showdown';

const createElementFromHTML = (htmlString) => {
  const converter = new showdown.Converter({ simpleLineBreaks: true });

  return converter.makeHtml(htmlString.trim());
};

export default createElementFromHTML;
