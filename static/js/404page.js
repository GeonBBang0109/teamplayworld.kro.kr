/*
    ======================================
    + 404 Page Javascript
    @ Team. PLAYWORLD 2024. 07. 29.
    ======================================
*/

// Scroll Animation
const intersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('section-contents')) {
            target.querySelector('.contents__wrap').classList.add('animation-up');
        }
        }
    });
};

const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 0.2,
});

const contentsSection = document.querySelector('.section-contents');

if (contentsSection) {
    observer.observe(contentsSection);
}