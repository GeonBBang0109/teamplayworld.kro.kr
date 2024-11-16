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

const allItems = document.querySelectorAll('.members__contents');
let filteredItems = Array.from(allItems);

const pagination = document.querySelector('.pagination');

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    filteredItems.forEach((item, index) => {
        item.classList.toggle('hidden', index < start || index >= end);
    });

    updatePagination();
}

function updatePagination() {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i;
        a.classList.toggle('active', i === currentPage);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(i);
        });
        pagination.appendChild(a);
    }
}

function filteringMemberTypes(type) {
    filteredItems = Array.from(allItems).filter(member => member.getAttribute('filter-tag-type') === type);
    allItems.forEach(item => {
        item.classList.add('hidden');
    });
    filteredItems.forEach(item => {
        item.classList.remove('hidden');
    });
    currentPage = 1;
    showPage(currentPage);
}

function resetFiltering() {
    filteredItems = Array.from(allItems);
    allItems.forEach(item => {
        item.classList.remove('hidden');
    });
    currentPage = 1;
    showPage(currentPage);
}

updatePagination();
showPage(currentPage);

// Filtering Button
const filteringElements = {
    filteringBtn: document.querySelector('.members__filter-dropdown-btn'),
    filteringDropdownContentsWrap: document.querySelector('.members__filter-dropdown-contents-wrap'),
    filteringButtons: {
        reset: document.querySelector('.filtering_reset'),
        creator: document.querySelector('.filtering_creator'),
        member: document.querySelector('.filtering_member')
    },
    filterCheck: document.querySelector('.members__filter-check'),
    filterCount: document.querySelector('.members__filter-count-items')
};

// Initially hide the dropdown and select reset button
filteringElements.filteringDropdownContentsWrap.classList.add('dropdown-inactive');
filteringElements.filteringButtons.reset.style.background = '#ddd';
filteringElements.filterCheck.textContent = '';
filteringElements.filterCount.textContent = `(전체 ${allItems.length}명)`;

filteringElements.filteringBtn.addEventListener('click', filteringToggle);

document.addEventListener('click', (event) => {
    if (!filteringElements.filteringDropdownContentsWrap.contains(event.target) && !filteringElements.filteringBtn.contains(event.target)) {
        toggleDropdown(false);
    }
});

Object.keys(filteringElements.filteringButtons).forEach(key => {
    filteringElements.filteringButtons[key].addEventListener('click', () => handleFilterClick(key));
});

function filteringToggle() {
    const isActive = filteringElements.filteringDropdownContentsWrap.classList.contains('dropdown-active');
    toggleDropdown(!isActive);
}

function toggleDropdown(show) {
    filteringElements.filteringDropdownContentsWrap.classList.toggle('dropdown-active', show);
    filteringElements.filteringDropdownContentsWrap.classList.toggle('dropdown-inactive', !show);
}

function resetBackgrounds() {
    Object.values(filteringElements.filteringButtons).forEach(button => {
        button.style.background = '';
    });
}

function handleFilterClick(type) {
    if (filteringElements.filteringButtons[type].style.background !== 'rgb(221, 221, 221)') { 
        resetBackgrounds();
        filteringElements.filteringButtons[type].style.background = '#ddd';
        toggleDropdown(false);
        
        switch (type) {
            case 'reset':
                filteringElements.filterCheck.textContent = '';
                resetFiltering();
                filteringElements.filterCount.textContent = `(전체 ${allItems.length}명)`;
                break;
            case 'creator':
                filteringElements.filterCheck.textContent = ': CREATOR';
                filteringMemberTypes('creator');
                filteringElements.filterCount.textContent = `(${filteredItems.length}명)`;
                break;
            case 'member':
                filteringElements.filterCheck.textContent = ': MEMBER';
                filteringMemberTypes('member');
                filteringElements.filterCount.textContent = `(${filteredItems.length}명)`;
                break;
        }
    }
}