/*
    ======================================
    + Default Javascript
    @ Team. PLAYWORLD 2024. 07. 29.
    ======================================
*/

// 이용자의 페이지 위치에 따른 네비게이션 속성 변경
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.header-contents__nav');
const mobileNavLinks = document.querySelectorAll('.mobile-header-contents__nav-contents__nav-link');
const navHomeLinks = document.querySelectorAll('.header-contents__nav[href="/"]')
const mobileNavHomeLinks = document.querySelectorAll('.mobile-header-contents__nav-contents__nav-link[href="/"]')

navLinks.forEach(link => {
    let linkHref = link.getAttribute('href');
    
    if (linkHref === currentPath || (linkHref + '.html') === currentPath) {
        link.classList.add('nav-active');
        link.removeAttribute('href');
    }
});

mobileNavLinks.forEach(link => {
    let linkHref = link.getAttribute('href');
    
    if (linkHref === currentPath || (linkHref + '.html') === currentPath) {
        link.classList.add('mobile-nav-active');
        link.removeAttribute('href');
    }
});

// 이용자가 메인 페이지를 '/index'로 접속한 경우
if (currentPath === '/index' || currentPath === '/index.html') {
    navHomeLinks.forEach(homeLink => {
        homeLink.classList.add('nav-active');
        homeLink.removeAttribute('href');
    });

    mobileNavHomeLinks.forEach(homeLink => {
        homeLink.classList.add('mobile-nav-active');
        homeLink.removeAttribute('href');
    });
}

// Mobile Header 네비게이션 레이어 표시
document.addEventListener('DOMContentLoaded', function() {
    const mobileHeaderCheckbox = document.querySelector('.mobile-header-contents__nav-button-check');
    const mobileNavLayer = document.querySelector('.mobile-header-contents__nav-layer');
    const mobileNavContents = document.querySelector('.mobile-header-contents__nav-contents')

    mobileHeaderCheckbox.addEventListener('change', function() {
        if (this.checked) {
            mobileNavLayer.style.height = '100vh';
            mobileNavContents.style.opacity = '1';
        } else {
            mobileNavLayer.style.height = '0';
            mobileNavContents.style.opacity = '0';
        }
    });
});

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