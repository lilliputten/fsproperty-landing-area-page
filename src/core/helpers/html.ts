export function htmlToNode(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
    const error = new Error(
      `html parameter must represent a single node; got ${nNodes}. ` +
        'Note that leading or trailing spaces around an element in your ' +
        'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
        'the element; call .trim() on your input to avoid this.',
    );
    // eslint-disable-next-line no-console
    console.error('[RequestFormModal:htmlToNode]', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  return template.content.firstChild;
}
