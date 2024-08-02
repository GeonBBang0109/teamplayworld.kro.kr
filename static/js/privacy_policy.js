/*
    ======================================
    + Privacy Policy Javascript
    @ Team. PLAYWORLD 2024. 08. 02.
    ======================================
*/

// Scroll Animation
const intersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('section-before-contents')) {
            target.querySelector('.before-contents__wrap').classList.add('animation-up');
        } else if (target.classList.contains('section-contents')) {
            target.querySelector('.contents__wrap').classList.add('animation-up');
        } 
        }
    });
};

const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 0.05,
});

const beforeContentsSection = document.querySelector('.section-before-contents');
const contentsSection = document.querySelector('.section-contents');

if (beforeContentsSection) {
    observer.observe(beforeContentsSection);
}

if (contentsSection) {
    observer.observe(contentsSection);
}