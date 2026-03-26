const body = document.body;
const headerNav = document.querySelector('.site-nav');
const mobileToggle = document.querySelector('.site-header__toggle');
const mobileMenu = document.querySelector('.mobile-menu');

const isGreetingPage = body.classList.contains('greeting-page');
const isHistoryPage = body.classList.contains('history-page');
const isLandingPage =
    body.classList.contains('home-page') &&
    !body.classList.contains('company-page') &&
    !body.classList.contains('contact-page') &&
    !body.classList.contains('product-page');
const isContactPage = body.classList.contains('contact-page');
const isCompanyPage = body.classList.contains('company-page') && !isContactPage && !isGreetingPage;
const isProductPage = body.classList.contains('product-page');

if (headerNav) {
    let productDropdown = headerNav.querySelector('.site-nav__dropdown--hover');
    let companyDropdown = Array.from(headerNav.children).find(
        (item) => item.classList.contains('site-nav__dropdown') && !item.classList.contains('site-nav__dropdown--hover')
    );

    let introLink = headerNav.querySelector('.site-nav__link--intro');
    if (!introLink) {
        introLink = document.createElement('a');
        introLink.className = 'site-nav__link site-nav__link--intro';
    }
    introLink.href = './greeting.html';
    introLink.textContent = '인사말';

    let companyLink = headerNav.querySelector('.site-nav__link--company');
    if (!companyLink) {
        companyLink = document.createElement('a');
        companyLink.className = 'site-nav__link site-nav__link--company';
    }
    companyLink.href = './company-overview.html';
    companyLink.textContent = '회사소개';

    if (companyDropdown) {
        headerNav.replaceChild(companyLink, companyDropdown);
    }

    if (!introLink.parentElement) {
        headerNav.prepend(introLink);
    }
    headerNav.insertBefore(introLink, companyLink);

    productDropdown = headerNav.querySelector('.site-nav__dropdown--hover');
    if (productDropdown) {
        const productLink = productDropdown.querySelector('.site-nav__link');
        if (productLink) {
            productLink.textContent = '제품소개';
        }
    }

    const contactLink = Array.from(headerNav.children).find(
        (item) => item.classList.contains('site-nav__link') && item.getAttribute('href') === './contact.html'
    );
    if (contactLink) {
        contactLink.textContent = '문의';
    }

    headerNav.querySelectorAll('.site-nav__link--active').forEach((link) => {
        link.classList.remove('site-nav__link--active');
    });
    headerNav.querySelectorAll('.site-nav__trigger--active').forEach((trigger) => {
        trigger.classList.remove('site-nav__trigger--active');
    });

    if (isLandingPage || isGreetingPage) {
        introLink.classList.add('site-nav__link--active');
    } else if (isContactPage && contactLink) {
        contactLink.classList.add('site-nav__link--active');
    } else if (isCompanyPage || isHistoryPage) {
        companyLink.classList.add('site-nav__link--active');
    } else if (isProductPage && productDropdown) {
        productDropdown.querySelector('.site-nav__link')?.classList.add('site-nav__link--active');
    }
}

if (mobileMenu) {
    const existingLinks = Array.from(mobileMenu.querySelectorAll('a'));
    let mobileIntroLink = existingLinks.find((link) => link.classList.contains('mobile-menu__intro'));

    if (!mobileIntroLink) {
        mobileIntroLink = document.createElement('a');
        mobileIntroLink.className = 'mobile-menu__intro';
        mobileMenu.prepend(mobileIntroLink);
    }

    mobileIntroLink.href = './greeting.html';
    mobileIntroLink.textContent = '인사말';

    const mobileLinks = Array.from(mobileMenu.querySelectorAll('a'));
    mobileLinks.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.remove('is-current');

        if (href === './company-overview.html') {
            link.textContent = '회사소개';
        } else if (href === './company-history.html') {
            link.textContent = '연혁';
        } else if (href === './contact.html') {
            link.textContent = '문의';
        } else if (href === './product-baby-kids.html') {
            link.textContent = '제품소개';
        } else if (href === './greeting.html') {
            link.textContent = '인사말';
        }
    });

    if (isLandingPage || isGreetingPage) {
        mobileIntroLink.classList.add('is-current');
    } else if (isContactPage) {
        mobileMenu.querySelector('a[href="./contact.html"]')?.classList.add('is-current');
    } else if (isHistoryPage) {
        mobileMenu.querySelector('a[href="./company-history.html"]')?.classList.add('is-current');
    } else if (isCompanyPage) {
        mobileMenu.querySelector('a[href="./company-overview.html"]')?.classList.add('is-current');
    } else if (isProductPage) {
        mobileMenu.querySelector('a[href="./product-baby-kids.html"]')?.classList.add('is-current');
    }
}

const triggerDropdowns = Array.from(document.querySelectorAll('.site-nav__dropdown')).filter((dropdown) =>
    dropdown.querySelector('.site-nav__trigger')
);

if (triggerDropdowns.length) {
    const closeAllMenus = () => {
        triggerDropdowns.forEach((dropdown) => {
            const trigger = dropdown.querySelector('.site-nav__trigger');
            const menu = dropdown.querySelector('.site-nav__menu');
            if (trigger && menu) {
                menu.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    };

    triggerDropdowns.forEach((dropdown) => {
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
        const clickedInsideDropdown = triggerDropdowns.some((dropdown) => dropdown.contains(event.target));
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
    mobileToggle.textContent = '';
    mobileToggle.setAttribute('aria-label', '메뉴 열기');

    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });
}
