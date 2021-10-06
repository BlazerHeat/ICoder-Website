const burger = document.querySelector('.burger');
const line1 = document.getElementById('burger-line1');
const line2 = document.getElementById('burger-line2');
const line3 = document.getElementById('burger-line3');

const navList = document.querySelector('.nav-list');

const scrollToTop = document.getElementById("scroll-to-top-icon");
const scrollToTopThreshold = 100;

burger.addEventListener('click', () => {
    if(line1.classList.contains('zero-opacity'))
        closeNavbar();
    else
        openNavbar();
});

scrollToTop.addEventListener("click", () => {
    window.scroll({ top: 0, behavior: 'smooth' })
});

if(window.scrollY >= scrollToTopThreshold)
    scrollToTop.classList.add("scroll-to-top-hide");

document.addEventListener('scroll', function () {
    if(window.scrollY >= scrollToTopThreshold)
        scrollToTop.classList.remove("scroll-to-top-hide");
    else
        scrollToTop.classList.add("scroll-to-top-hide");
});


function openNavbar(){
    line1.classList.add("zero-opacity");
    line3.classList.add("zero-opacity");
    line2.classList.add("burger-cross");
    navList.classList.add("open-nav-list");
}

function closeNavbar(){
    line1.classList.remove("zero-opacity");
    line3.classList.remove("zero-opacity");
    line2.classList.remove("burger-cross");
    navList.classList.remove("open-nav-list");
}