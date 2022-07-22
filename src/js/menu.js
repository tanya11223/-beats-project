const openMenu = document.querySelector("#openOverlay");
const body = document.body;
const create = createModal();

openMenu.addEventListener("click", e => {
  e.preventDefault();
  body.appendChild(create);
})

function createModal () {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay"); 

  const template = document.querySelector("#overlayTemplate");

  overlayElement.innerHTML = template.innerHTML; 

  const closeElement = overlayElement.querySelector("#close");

  closeElement.addEventListener("click", e => {
    e.preventDefault();
    body.removeChild(overlayElement);
  });

  overlayElement.addEventListener("click", (e) => {
    e.preventDefault();
    if(e.target.classList.contains('menu__link')) {
      body.removeChild(overlayElement);
    }
  });

  return overlayElement;
}