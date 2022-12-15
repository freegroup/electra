function rafAsync() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve); //faster than set time out
  });
}

export default function checkElement(selector) {
  if (document.querySelector(selector) === null) {
    return rafAsync().then(() => checkElement(selector));
  } else {
    return Promise.resolve(true);
  }
}


