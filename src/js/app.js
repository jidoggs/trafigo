const navList = ["ABOUT US", "HOW TO APPLY", "FAQS", "CONTACT US"];
const navListFooter = navList.slice(0, -1);
const sectionListElements = document.querySelectorAll("[id^=section-]");
const headerEl = document.querySelector("header");
const faq = document.getElementById("questions");

const createNavLink = (navItem) => {
  navItem.forEach((item) => {
    let li = document.createElement("li");
    let listItem = document.createElement("a");
    listItem.innerHTML = item;
    li.appendChild(listItem);
    document
      .querySelector(navItem === navList ? "#nav-head" : "#nav-foot")
      .appendChild(li);
  });
};

createNavLink(navList);
createNavLink(navListFooter);

const scrollHandler = (e) => {
  e.preventDefault();
  let values = e.target.innerText;
  if (document.getElementById("mobile-nav").checked === true) {
    document.getElementById("mobile-nav").checked = false;
  }

  const clickScroll = (val) => {
    let positionObj = {};
    sectionListElements.forEach((el) => {
      if (val === el.querySelector("h2").innerText) {
        positionObj.top = el.offsetTop - headerEl.offsetHeight;
        positionObj.left = el.offsetLeft;
      }
    });

    return positionObj;
  };
  document.body.animate(
    window.scrollTo({
      top: clickScroll(values).top,
      left: clickScroll(values).left,
      behavior: "smooth",
    }),
    1000
  );
};

const headerScrollHandler = (e) => {
  if (window.scrollY <= document.querySelector(".hero").offsetHeight) {
    document.querySelectorAll("#nav-head > li > a").forEach((el) => {
      el.classList.remove("activeNav");
    });
  }

  if (window.scrollY <= 1) {
    headerEl.classList.add("removeBg");
    headerEl.classList.remove("addBg");
  } else {
    headerEl.classList.remove("removeBg");
    headerEl.classList.add("addBg");
    sectionListElements.forEach((el) => {
      if (
        el.offsetTop - headerEl.offsetHeight <= window.scrollY &&
        el.offsetTop + el.offsetHeight >= window.scrollY
      ) {
        document.querySelectorAll("#nav-head > li > a").forEach((navEl) => {
          if (navEl.innerText === el.querySelector("h2").innerText) {
            navEl.classList.add("activeNav");
          } else {
            navEl.classList.remove("activeNav");
          }
        });
      }
    });
  }
};
const faqHandler = (e) => {
  if (e.target.querySelector("ul")) {
    e.target.closest("li").classList.toggle("rotate");
    e.target.querySelector("ul").classList.toggle("answers-show");
  }
};
let day = new Date();
document.getElementById("cp-year").textContent = day.getFullYear();

document
  .querySelectorAll("nav")
  .forEach((el) => el.addEventListener("click", scrollHandler));

faq.addEventListener("click", faqHandler);

window.addEventListener("scroll", headerScrollHandler);
