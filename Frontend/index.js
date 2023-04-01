// drop down-----start
const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

let wk_mngt1 = document.getElementById("wk_mngt1");
let wk_mngt2 = document.getElementById("wk_mngt2");
let wk_mngt3 = document.getElementById("wk_mngt3");
let wk_mngt4 = document.getElementById("wk_mngt4");

wk_mngt1.addEventListener("click", () => {
  window.location.href = "./pages/wk_mngt.html";
});
wk_mngt2.addEventListener("click", () => {
  window.location.href = "./pages/wk_mngt.html";
});
wk_mngt3.addEventListener("click", () => {
  window.location.href = "./pages/wk_mngt.html";
});
wk_mngt4.addEventListener("click", () => {
  window.location.href = "./pages/wk_mngt.html";
});

// drop down-----end

let hreflink = document.getElementById("hrefLogin");
console.log(hreflink);

let userName = localStorage.getItem("fname");
console.log(userName);

if (userName) {
  hreflink.innerText = userName;
}

// username show in navbar over
