const navList = ["ABOUT", "HOW TO", "FAQS", "CONTACT US"];

navList.forEach((item) => {
  let li = document.createElement("li");
  let listItem = document.createElement("a");
  listItem.innerText = item;
  li.appendChild(listItem);
  document.querySelector("#navy").appendChild(li);
});

const scrollHandler = (e) => {
  e.preventDefault();
  let values = e.target.innerText;
  if (document.getElementById("mobile-nav").checked === true) {
    document.getElementById("mobile-nav").checked = false;
  }
  document.querySelectorAll("#navy > li > a").forEach((el) => {
    if (el.innerText === values) {
      el.classList.add("activeNav");
    } else {
      el.classList.remove("activeNav");
    }
  });

  window.scrollTo({
    top:
      (values === "ABOUT"
        ? document.getElementById("section-about").offsetTop
        : values === "HOW TO"
        ? document.getElementById("section-how").offsetTop
        : values === "FAQS"
        ? document.getElementById("section-faq").offsetTop
        : document.getElementById("section-contact").offsetTop) - 100,
    left:
      values === "ABOUT"
        ? document.getElementById("section-about").offsetLeft
        : values === "HOW TO"
        ? document.getElementById("section-how").offsetLeft
        : values === "FAQS"
        ? document.getElementById("section-faq").offsetLeft
        : document.getElementById("section-contact").offsetLeft,
    behavior: "smooth",
  });
};

const headerScrollHandler = (e) => {
  if (window.scrollY <= 50) {
    document.querySelector("header").style.backgroundColor = "transparent";
    document.querySelectorAll("#navy > li > a").forEach((el) => {
      el.classList.remove("activeNav");
    });
  } else {
    document.querySelector("header").style.backgroundColor = "#EE4D47";
  }
};

let day = new Date();
document.getElementById("cp-year").innerText = day.getFullYear();

document
  .querySelectorAll("nav")
  .forEach((el) => el.addEventListener("click", scrollHandler));

window.addEventListener("scroll", headerScrollHandler);
