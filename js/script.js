// Get DOM elements
const searchContainer = document.querySelector(".search-container");
const searchIcon = document.querySelector(".search-icon");
const searchClose = document.querySelector(".search-close");
const searchInput = document.querySelector(".search-input");
const hamburgerMenu = document.querySelector(".nav__menu");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu__close");
const mobileSearchBtn = document.querySelector(".mobile-search-btn");
const mobileSearchExpanded = document.querySelector(".mobile-search-expanded");
const mobileSearchClose = document.querySelector(
    ".mobile-search-expanded__close"
);
const mobileSearchInput = document.querySelector(
    ".mobile-search-expanded__input"
);
const body = document.body;

// Function to expand search
function expandSearch() {
    searchContainer.classList.add("active");
    searchInput.focus();
    // Close mobile menu if open
    if (hamburgerMenu.classList.contains("active")) {
        closeMobileMenu();
    }
}

// Function to collapse search
function collapseSearch() {
    searchContainer.classList.remove("active");
    searchInput.value = "";
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    hamburgerMenu.classList.toggle("active");
    mobileMenu.style.display = hamburgerMenu.classList.contains("active")
        ? "block"
        : "none";
    body.style.overflow = hamburgerMenu.classList.contains("active")
        ? "hidden"
        : "";
    // Close search if open
    if (searchContainer.classList.contains("active")) {
        collapseSearch();
    }
}

// Function to close mobile menu
function closeMobileMenu() {
    hamburgerMenu.classList.remove("active");
    mobileMenu.style.display = "none";
    body.style.overflow = "";
}

// Function to toggle mobile search
function toggleMobileSearch() {
    mobileSearchExpanded.classList.toggle("active");
    if (mobileSearchExpanded.classList.contains("active")) {
        mobileSearchInput.focus();
        // Close mobile menu if open
        if (hamburgerMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    }
    body.style.overflow = mobileSearchExpanded.classList.contains("active")
        ? "hidden"
        : "";
}

// Function to close mobile search
function closeMobileSearch() {
    mobileSearchExpanded.classList.remove("active");
    body.style.overflow = "";
    mobileSearchInput.value = "";
}

// Event Listeners
if (searchIcon) searchIcon.addEventListener("click", expandSearch);
if (searchClose) searchClose.addEventListener("click", collapseSearch);
if (hamburgerMenu) hamburgerMenu.addEventListener("click", toggleMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
if (mobileSearchBtn)
    mobileSearchBtn.addEventListener("click", toggleMobileSearch);
if (mobileSearchClose)
    mobileSearchClose.addEventListener("click", closeMobileSearch);

// Close search and menu on pressing Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (searchContainer.classList.contains("active")) {
            collapseSearch();
        }
        if (hamburgerMenu.classList.contains("active")) {
            closeMobileMenu();
        }
        if (mobileSearchExpanded.classList.contains("active")) {
            closeMobileSearch();
        }
    }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (
        hamburgerMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !hamburgerMenu.contains(e.target)
    ) {
        closeMobileMenu();
    }
});

// Close search when clicking outside
document.addEventListener("click", (e) => {
    if (
        mobileSearchExpanded.classList.contains("active") &&
        !mobileSearchExpanded.contains(e.target) &&
        !mobileSearchBtn.contains(e.target)
    ) {
        closeMobileSearch();
    }
});

// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
    // Gallery Elements
    const gallerySlides = document.querySelectorAll(".gallery__slide");
    const prevButton = document.querySelector(".gallery__nav--prev");
    const nextButton = document.querySelector(".gallery__nav--next");
    const dots = document.querySelectorAll(".gallery__dot");
    const thumbs = document.querySelectorAll(".gallery__thumb");

    let currentSlide = 0;

    // Function to update slide
    function updateSlide(index) {
        gallerySlides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));
        thumbs.forEach((thumb) => thumb.classList.remove("active"));

        gallerySlides[index].classList.add("active");
        dots[index].classList.add("active");
        thumbs[index].classList.add("active");
        currentSlide = index;
    }

    // Previous slide
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            const newIndex =
                currentSlide === 0
                    ? gallerySlides.length - 1
                    : currentSlide - 1;
            updateSlide(newIndex);
        });
    }

    // Next slide
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            const newIndex =
                currentSlide === gallerySlides.length - 1
                    ? 0
                    : currentSlide + 1;
            updateSlide(newIndex);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateSlide(index);
        });
    });

    // Thumbnail navigation
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            updateSlide(index);
        });
    });

    // Product Selection Logic
    const flavorInputs = document.querySelectorAll('input[name="flavor"]');
    const purchaseInputs = document.querySelectorAll('input[name="purchase"]');
    const addToCartButton = document.querySelector(".btn-cart");

    // Product variants mapping with dummy URLs for all 9 combinations
    const productVariants = {
        original: {
            single: "https://checkout.alcami.com/original/single-kit",
            double: "https://checkout.alcami.com/original/double-kit",
            once: "https://checkout.alcami.com/original/try-once",
        },
        matcha: {
            single: "https://checkout.alcami.com/matcha/single-kit",
            double: "https://checkout.alcami.com/matcha/double-kit",
            once: "https://checkout.alcami.com/matcha/try-once",
        },
        cacao: {
            single: "https://checkout.alcami.com/cacao/single-kit",
            double: "https://checkout.alcami.com/cacao/double-kit",
            once: "https://checkout.alcami.com/cacao/try-once",
        },
    };

    // Function to update cart URL based on selections
    function updateCartUrl() {
        const selectedFlavor = document.querySelector(
            'input[name="flavor"]:checked'
        ).value;
        const selectedPurchase = document.querySelector(
            'input[name="purchase"]:checked'
        ).value;

        if (addToCartButton) {
            const newUrl = productVariants[selectedFlavor][selectedPurchase];
            addToCartButton.href = newUrl;

            // Optional: Log the current selection and URL (for testing)
            console.log(`Selected: ${selectedFlavor} - ${selectedPurchase}`);
            console.log(`Cart URL: ${newUrl}`);
        }
    }

    // Add event listeners to both flavor and purchase radio buttons
    flavorInputs.forEach((input) => {
        input.addEventListener("change", updateCartUrl);
    });

    purchaseInputs.forEach((input) => {
        input.addEventListener("change", updateCartUrl);
    });

    // Initialize with default selection
    updateCartUrl();

    // Function to handle flavor selection and update package images
    const packageImages = document.querySelectorAll(
        '.package img[alt="Subscription Package"]'
    );

    flavorInputs.forEach((input) => {
        input.addEventListener("change", function () {
            // Get the selected flavor's image source
            const selectedFlavorImage =
                this.nextElementSibling.querySelector("img").src;
            // Update all package images with the selected flavor's image
            packageImages.forEach((img) => {
                img.src = selectedFlavorImage;
            });
        });
    });

    // Purchase option expansion/collapse functionality
    const purchaseOptions = document.querySelectorAll(".purchase__option");

    function collapseAllOptions() {
        purchaseOptions.forEach((option) => {
            const included = option.querySelector(".included");
            if (included) {
                included.style.display = "none";
            }
            option.classList.remove("expanded");
        });
    }

    function expandOption(option) {
        const included = option.querySelector(".included");
        if (included) {
            included.style.display = "block";
        }
        option.classList.add("expanded");
    }

    // Initialize with the checked option expanded
    const initialCheckedOption = document.querySelector(
        'input[name="purchase"]:checked'
    );
    if (initialCheckedOption) {
        const optionContainer =
            initialCheckedOption.closest(".purchase__option");
        expandOption(optionContainer);
    }

    // Add click event listeners to purchase options
    purchaseOptions.forEach((option) => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener("change", function () {
                collapseAllOptions();
                expandOption(option);
            });
        }
    });
});

// Counter Animation
function startCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const duration = 1000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // Update every 16ms (60fps)
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            return;
        }
        counter.textContent = Math.round(current);
        requestAnimationFrame(updateCounter);
    };

    updateCounter();
}

// Intersection Observer for counters
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".counter");
            counters.forEach((counter) => startCounter(counter));
            counterObserver.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe the stats section
const statsSection = document.querySelector(".stats");
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Testimonials Slider
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".testimonials__slider");
    const slides = document.querySelectorAll(".testimonial");
    const prevButton = document.querySelector(".testimonials__nav--prev");
    const nextButton = document.querySelector(".testimonials__nav--next");
    const dots = document.querySelectorAll(".testimonials__dot");

    let currentPosition = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const slideWidth = slides[0].offsetWidth + 24;
            slider.style.transform = `translateX(-${
                currentPosition * slideWidth
            }px)`;
        } else {
            const containerWidth = slider.parentElement.offsetWidth;
            const slideWidth = (containerWidth - 48) / 3 + 24;
            slider.style.transform = `translateX(-${
                currentPosition * slideWidth
            }px)`;
        }

        // Update button states
        prevButton.style.opacity = currentPosition === 0 ? "0.5" : "1";
        prevButton.style.pointerEvents =
            currentPosition === 0 ? "none" : "auto";

        const maxPosition = isMobile ? totalSlides - 1 : totalSlides - 3;
        nextButton.style.opacity = currentPosition >= maxPosition ? "0.5" : "1";
        nextButton.style.pointerEvents =
            currentPosition >= maxPosition ? "none" : "auto";

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove("active");
        });
        // Calculate which dot should be active
        const activeDotIndex = Math.min(
            Math.floor(currentPosition / (isMobile ? 1 : 1)),
            dots.length - 1
        );
        dots[activeDotIndex].classList.add("active");
    }

    function nextSlide() {
        const isMobile = window.innerWidth <= 768;
        const maxPosition = isMobile ? totalSlides - 1 : totalSlides - 3;

        if (currentPosition < maxPosition) {
            currentPosition++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentPosition > 0) {
            currentPosition--;
            updateSlider();
        }
    }

    // Event listeners
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Handle window resize
    let lastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
        if (
            (window.innerWidth <= 768 && lastWidth > 768) ||
            (window.innerWidth > 768 && lastWidth <= 768)
        ) {
            currentPosition = 0;
        }
        lastWidth = window.innerWidth;
        updateSlider();
    });

    // Initial setup
    updateSlider();
});

// FAQ Accordion
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq__item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq__question");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all other items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            // Toggle current item
            item.classList.toggle("active");
        });
    });
});
