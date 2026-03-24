const productDropdown = document.querySelector('.product-header__dropdown');
const productTrigger = document.querySelector('.product-header__trigger');
const productMenu = document.querySelector('.product-header__menu');

if (productDropdown && productTrigger && productMenu) {
    const closeProductMenu = () => {
        productMenu.classList.remove('is-open');
        productTrigger.setAttribute('aria-expanded', 'false');
    };

    productTrigger.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = !productMenu.classList.contains('is-open');

        closeProductMenu();

        if (shouldOpen) {
            productMenu.classList.add('is-open');
            productTrigger.setAttribute('aria-expanded', 'true');
        }
    });

    productMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
        if (!productDropdown.contains(event.target)) {
            closeProductMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeProductMenu();
        }
    });
}
