/*
    ======================================
    + Home Javascript
    @ Team. PLAYWORLD 2024. 07. 29.
    ======================================
*/

// Scroll Animation
const intersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('section-intro')) {
            target.querySelector('.intro__wrap').classList.add('animation-up');
        } else if (target.classList.contains('section-contents__about')) {
            target.querySelector('.about__wrap').classList.add('animation-up');
        } else if (target.classList.contains('info__news-wrap')) {
            target.querySelector('.info__news-title').classList.add('animation-up');
            target.querySelector('.info__news-arrange').classList.add('animation-up');
        } else if (target.classList.contains('info__videos-wrap')) {
            target.querySelector('.info__videos-title').classList.add('animation-up');
            target.querySelector('.info__videos-arrange').classList.add('animation-up');
        }
        }
    });
};

const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 0.2,
});

const introSection = document.querySelector('.section-intro');
const aboutSection = document.querySelector('.section-contents__about');
const newsSection = document.querySelector('.info__news-wrap');
const videoSection = document.querySelector('.info__videos-wrap');

if (introSection) {
    observer.observe(introSection);
}

if (aboutSection) {
    observer.observe(aboutSection);
}

if (newsSection) {
    observer.observe(newsSection);
}

if (videoSection) {
    observer.observe(videoSection);
}