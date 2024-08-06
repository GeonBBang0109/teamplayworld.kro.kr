/*
    ======================================
    + Default Javascript
    @ Team. PLAYWORLD 2024. 07. 29.
    ======================================
*/

// 이용자의 페이지 위치에 따른 네비게이션 속성 변경
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.header-contents__nav');
const navHomeLinks = document.querySelectorAll('.header-contents__nav[href="/"]')

navLinks.forEach(link => {
    let linkHref = link.getAttribute('href');
    
    if (linkHref === currentPath || (linkHref + '.html') === currentPath) {
        link.classList.add('nav-active');
        link.removeAttribute('href');
    }
});

// 이용자가 메인 페이지를 '/index'로 접속한 경우
if (currentPath === '/index') {
    navHomeLinks.forEach(homeLink => {
        homeLink.classList.add('nav-active');
        homeLink.removeAttribute('href');
    });
}

// Footer가 보일 때 Footer Contents에 애니메이션 작동
const footerIntersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        const target = entry.target;
        if (target.classList.contains('footer')) {
            target.querySelector('.footer__contents-wrap').classList.add('animation-fade');
            target.querySelector('.footer__contents-copyright').classList.add('animation-fade');
        }
        }
    });
};

const footerObserver = new IntersectionObserver(footerIntersectionCallback, {
    threshold: 0.2,
});

const footer = document.querySelector('.footer');

if (footer) {
    footerObserver.observe(footer);
}