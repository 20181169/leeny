const homeDropdowns = document.querySelectorAll('.site-nav__dropdown');
const mobileToggle = document.querySelector('.site-header__toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (homeDropdowns.length) {
    const closeAllMenus = () => {
        homeDropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.site-nav__trigger');
            const menu = dropdown.querySelector('.site-nav__menu');
            if (trigger && menu) {
                menu.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    };

    homeDropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector('.site-nav__trigger');
        const menu = dropdown.querySelector('.site-nav__menu');

        if (!trigger || !menu) {
            return;
        }

        trigger.addEventListener('click', (event) => {
            event.stopPropagation();
            const shouldOpen = !menu.classList.contains('is-open');
            closeAllMenus();
            if (shouldOpen) {
                menu.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', (event) => {
        const clickedInsideDropdown = Array.from(homeDropdowns).some((dropdown) => dropdown.contains(event.target));
        if (!clickedInsideDropdown) {
            closeAllMenus();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAllMenus();
        }
    });
}

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
}
