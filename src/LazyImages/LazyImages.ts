import './LazyImages.styles.scss';

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const wHeight = window.innerHeight || document.documentElement.clientHeight;
  const { top, bottom } = rect;
  // NOTE: Checking only vertical position
  return bottom >= 0 && top <= wHeight;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const imgNode = document.createElement('img');
    imgNode.setAttribute('src', url);
    imgNode.addEventListener('load', (_event) => {
      /* console.log('[LazyImages:loadImage] success', {
       *   url,
       *   _event,
       * });
       */
      resolve(imgNode);
    });
    imgNode.addEventListener('error', (event) => {
      const { target } = event;
      // @ts-ignore: To add correct typings?
      const { href, baseURI } = target;
      const error = new Error(`Cannot load image with url '${url}'`);
      // eslint-disable-next-line no-console
      console.error('[LazyImages:loadImage]', {
        error,
        url,
        href,
        baseURI,
        target,
        event,
      });
      // eslint-disable-next-line no-debugger
      debugger;
      reject(error);
    });
  });
}

function initLazyImageNode(node: HTMLElement, observer: IntersectionObserver) {
  const isVisible = isElementInViewport(node);
  if (!isVisible) {
    return Promise.resolve(false);
  }
  const isLoaded = node.getAttribute('data-lazy-loaded');
  if (isLoaded) {
    return Promise.resolve(true);
  }
  /* NOTE: An alternative way to fetch data attributes
   * const dataLazyImage = node.getAttribute('data-lazy-image');
   * const dataOriginalImage = node.getAttribute('dataOriginalImage');
   */
  const { dataset } = node;
  const { lazyMode, originalImage } = dataset;
  /* console.log('[LazyImages:initLazyImageNode]', {
   *   isVisible,
   *   lazyMode,
   *   originalImage,
   *   node,
   * });
   */
  // TODO: Load images asynchronously into another (temp) node, control success or error, and update target only on success
  node.setAttribute('data-lazy-loading', 'true');
  loadImage(originalImage)
    .then((img) => {
      if (lazyMode.startsWith('background')) {
        const backgroundImage = `url('${img.src}')`;
        node.style.backgroundImage = backgroundImage;
      } else {
        if (node.getAttribute('src') === img.src) {
          return false;
        }
        node.setAttribute('src', originalImage);
      }
      // Finish
      setTimeout(() => {
        node.setAttribute('data-lazy-loaded', 'true');
        node.removeAttribute('data-lazy-loading');
      }, 350);
      observer.unobserve(node);
      return true;
    })
    .catch(() => {});
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ target }) => {
    initLazyImageNode(target as HTMLElement, observer);
  });
});

export function initLazyImages() {
  const nodes = document.querySelectorAll('.LazyImage');
  nodes.forEach((node: HTMLDivElement) => {
    observer.observe(node);
  });
}
