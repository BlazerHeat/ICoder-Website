var options = {
    strings: [
        '"Meet us, Developers of iCoder..."',
    ],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1250,
    loop: true,
    loopCount: Infinity,
    smartBackspace: true,
};

new Typed(".typings", options);

const swiper = new Swiper('.swiper', {
    centeredSlides: true,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
