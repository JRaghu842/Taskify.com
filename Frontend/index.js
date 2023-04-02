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

let useremail = localStorage.getItem("email");
console.log(useremail);

if (useremail) {
  const Uname = useremail.substring(0, useremail.indexOf("@"));
  console.log(Uname);

  hreflink.innerText = Uname;
}

// username show in navbar over

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  alert("Logout Successful");
  window.location.href = "index.html";
});

// backend deployed url
// https://zany-lime-swordfish-cuff.cyclic.app/
