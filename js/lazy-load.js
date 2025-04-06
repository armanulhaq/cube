document.addEventListener("DOMContentLoaded", function () {
    // Handle lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ("loading" in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach((img) => {
            if (img.complete) {
                img.classList.add("loaded");
            } else {
                img.addEventListener("load", function () {
                    this.classList.add("loaded");
                });
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add("loaded");
                            observer.unobserve(img);
                        }
                    }
                });
            },
            {
                rootMargin: "50px 0px",
                threshold: 0.01,
            }
        );

        lazyImages.forEach((img) => {
            if (img.src) {
                img.dataset.src = img.src;
                img.src = "";
                lazyLoadObserver.observe(img);
            }
        });
    }
});
