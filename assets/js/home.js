const homeDropdown = document.querySelector('.site-nav__dropdown');
const homeTrigger = document.querySelector('.site-nav__trigger');
const homeMenu = document.querySelector('.site-nav__menu');
const mobileToggle = document.querySelector('.site-header__toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (homeDropdown && homeTrigger && homeMenu) {
    const closeHomeMenu = () => {
        homeMenu.classList.remove('is-open');
        homeTrigger.setAttribute('aria-expanded', 'false');
    };

    homeTrigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = !homeMenu.classList.contains('is-open');
        closeHomeMenu();
        if (shouldOpen) {
            homeMenu.classList.add('is-open');
            homeTrigger.setAttribute('aria-expanded', 'true');
        }
    });

    document.addEventListener('click', (event) => {
        if (!homeDropdown.contains(event.target)) {
            closeHomeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeHomeMenu();
        }
    });
}

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
}
