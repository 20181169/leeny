const body = document.body;
const headerNav = document.querySelector('.site-nav');
const homeDropdowns = document.querySelectorAll('.site-nav__dropdown');
const mobileToggle = document.querySelector('.site-header__toggle');
const mobileMenu = document.querySelector('.mobile-menu');

const isLandingPage =
    body.classList.contains('home-page') &&
    !body.classList.contains('company-page') &&
    !body.classList.contains('contact-page') &&
    !body.classList.contains('product-page');
const isContactPage = body.classList.contains('contact-page');
const isCompanyPage = body.classList.contains('company-page') && !isContactPage;
const isProductPage = body.classList.contains('product-page');

if (headerNav) {
    const directLinks = Array.from(headerNav.children).filter((item) => item.classList.contains('site-nav__link'));
    const companyDropdown = headerNav.querySelector('.site-nav__dropdown:not(.site-nav__dropdown--hover)');
    const productDropdown = headerNav.querySelector('.site-nav__dropdown--hover');
    const companyTrigger = companyDropdown?.querySelector('.site-nav__trigger');
    const companyMenuLinks = companyDropdown ? Array.from(companyDropdown.querySelectorAll('.site-nav__menu a')) : [];
    const productLink = productDropdown?.querySelector('.site-nav__link');
    const contactLink = directLinks.find((link) => link.getAttribute('href') === './contact.html');

    let introLink = headerNav.querySelector('.site-nav__link--intro');

    if (!introLink) {
        introLink = document.createElement('a');
        introLink.href = './index.html';
        introLink.className = 'site-nav__link site-nav__link--intro';
        if (companyDropdown) {
            headerNav.insertBefore(introLink, companyDropdown);
        } else {
            headerNav.prepend(introLink);
        }
    }

    introLink.textContent = '인사말';

    if (companyTrigger) {
        companyTrigger.textContent = '회사소개';
    }

    companyMenuLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === './company-overview.html') {
            link.textContent = '회사소개';
        } else if (href === './company-history.html') {
            link.textContent = '연혁';
        } else if (href === './contact.html') {
            link.textContent = '문의';
        }
    });

    if (productLink) {
        productLink.textContent = '제품소개';
    }

    if (contactLink) {
        contactLink.textContent = '문의';
    }

    headerNav.querySelectorAll('.site-nav__link--active').forEach((link) => link.classList.remove('site-nav__link--active'));
    headerNav.querySelectorAll('.site-nav__trigger--active').forEach((trigger) => trigger.classList.remove('site-nav__trigger--active'));

    if (isLandingPage && introLink) {
        introLink.classList.add('site-nav__link--active');
    } else if (isContactPage && contactLink) {
        contactLink.classList.add('site-nav__link--active');
    } else if (isCompanyPage && companyTrigger) {
        companyTrigger.classList.add('site-nav__trigger--active');
    } else if (isProductPage && productLink) {
        productLink.classList.add('site-nav__link--active');
    }
}

if (mobileMenu) {
    const mobileLinks = Array.from(mobileMenu.querySelectorAll('a'));
    let mobileIntroLink = mobileLinks.find((link) => link.classList.contains('mobile-menu__intro'));

    if (!mobileIntroLink) {
        mobileIntroLink = document.createElement('a');
        mobileIntroLink.href = './index.html';
        mobileIntroLink.className = 'mobile-menu__intro';
        mobileMenu.prepend(mobileIntroLink);
    }

    mobileIntroLink.textContent = '인사말';

    mobileLinks.concat(mobileIntroLink).forEach((link) => {
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
        } else if (href === './index.html') {
            link.textContent = '인사말';
        }
    });

    if (isLandingPage) {
        mobileIntroLink.classList.add('is-current');
    } else if (isContactPage) {
        mobileMenu.querySelector('a[href="./contact.html"]')?.classList.add('is-current');
    } else if (isCompanyPage) {
        const companyCurrent = body.classList.contains('history-page')
            ? mobileMenu.querySelector('a[href="./company-history.html"]')
            : mobileMenu.querySelector('a[href="./company-overview.html"]');
        companyCurrent?.classList.add('is-current');
    } else if (isProductPage) {
        mobileMenu.querySelector('a[href="./product-baby-kids.html"]')?.classList.add('is-current');
    }
}

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
    mobileToggle.textContent = '';
    mobileToggle.setAttribute('aria-label', '메뉴 열기');

    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });
}
