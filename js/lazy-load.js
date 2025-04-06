document.addEventListener("DOMContentLoaded", function () {
    // Handle lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ("loading" in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach((img) => {
            img.addEventListener("load", function () {
                this.classList.add("loaded");
            });
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add("loaded");
                        observer.unobserve(img);
                    }
                });
            }
        );

        lazyImages.forEach((img) => {
            img.dataset.src = img.src;
            img.src = "";
            lazyLoadObserver.observe(img);
        });
    }
});
