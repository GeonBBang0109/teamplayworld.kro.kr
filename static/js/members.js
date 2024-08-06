/*
    ======================================
    + Members Javascript
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
        } else if (target.classList.contains('section-contents__members')) {
            target.querySelector('.members__wrap').classList.add('animation-up');
        }
        }
    });
};

const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 0.2,
});

const introSection = document.querySelector('.section-intro');
const memberSection = document.querySelector('.section-contents__members');

if (introSection) {
    observer.observe(introSection);
}

if (memberSection) {
    observer.observe(memberSection);
}

// Pagination
const itemsPerPage = 8;
let currentPage = 1;

const items = document.querySelectorAll('.members__contents');
const totalPages = Math.ceil(items.length / itemsPerPage);
const pagination = document.querySelector('.pagination');

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
        item.classList.toggle('hidden', index < start || index >= end);
    });

    document.querySelectorAll('.pagination a').forEach(link => {
        const pageNumber = parseInt(link.textContent);
        if (pageNumber === currentPage) {
            link.classList.add('active');
            link.classList.remove('disabled');
        } else {
            link.classList.remove('active');
            link.classList.remove('disabled');
        }
    });
}

function createPagination() {
    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            if (i !== currentPage) {
                showPage(i);
            }
        });
        if (i === currentPage) {
            a.classList.add('disabled');
        }
        pagination.appendChild(a);
    }
}

createPagination();
showPage(currentPage);