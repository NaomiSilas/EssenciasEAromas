const btnMenu = document.getElementById("btn-menu-mobile");
const navbarMenu = document.getElementById("navbar-menu");

if (btnMenu && navbarMenu) {
  btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("aberto");
    navbarMenu.classList.toggle("aberto");
  });

  navbarMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      btnMenu.classList.remove("aberto");
      navbarMenu.classList.remove("aberto");
    });
  });
}