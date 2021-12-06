const navList = ["ABOUT US", "HOW TO APPLY", "FAQS", "CONTACT US"];
const navListFooter = navList.slice(0, -1);
const sectionListElements = document.querySelectorAll("[id^=section-]");

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
        positionObj.top = el.offsetTop - 100;
        positionObj.left = el.offsetLeft;
      }
    });

    return positionObj;
  };

  window.scrollTo({
    top: clickScroll(values).top,
    left: clickScroll(values).left,
    behavior: "smooth",
  });
};

const headerScrollHandler = (e) => {
  if (window.scrollY === 0) {
    document.querySelectorAll("#nav-head > li > a").forEach((el) => {
      el.classList.remove("activeNav");
    });
  }
  const headerEl = document.querySelector("header");

  if (window.scrollY <= 1) {
    headerEl.classList.add("removeBg");
    headerEl.classList.remove("addBg");
  } else {
    headerEl.classList.remove("removeBg");
    headerEl.classList.add("addBg");
    sectionListElements.forEach((el) => {
      if (
        el.offsetTop - 100 <= window.scrollY &&
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
let day = new Date();
document.getElementById("cp-year").innerText = day.getFullYear();

document
  .querySelectorAll("nav")
  .forEach((el) => el.addEventListener("click", scrollHandler));

window.addEventListener("scroll", headerScrollHandler);
