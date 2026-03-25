document.querySelectorAll('.product-card[data-product-link]').forEach((card) => {
    const href = card.getAttribute('data-product-link');

    if (!href) {
        return;
    }

    const goToDetail = () => {
        window.location.href = href;
    };

    card.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) {
            return;
        }

        goToDetail();
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goToDetail();
        }
    });
});
