const isMobile = checkIsMobile();

function onPhoneButtonClick(event: Event) {
  if (!isMobile) {
    event.preventDefault();
    // Slowly animated scroll to top
    $('html, body').animate({ scrollTop: 0 }, 500);
  }
}

function checkIsMobile() {
  const isMobileReg = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const agent = navigator.userAgent;
  const isMobile = isMobileReg.test(agent);
  return isMobile;
}

export function initRootNode() {
  const mainNode = document.querySelector('.main');
  mainNode.classList.add('Root');

  const phoneButton = mainNode.querySelector('.PhoneButton');
  if (phoneButton) {
    phoneButton.addEventListener('click', onPhoneButtonClick);
  }
}
