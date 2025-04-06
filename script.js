// Get DOM elements
const searchContainer = document.querySelector(".search-container");
const searchIcon = document.querySelector(".search-icon");
const searchClose = document.querySelector(".search-close");
const searchInput = document.querySelector(".search-input");
const hamburgerMenu = document.querySelector(".nav__menu");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClose = document.querySelector(".mobile-menu__close");

// Function to expand search
function expandSearch() {
    searchContainer.classList.add("active");
    searchInput.focus();
}

// Function to collapse search
function collapseSearch() {
    searchContainer.classList.remove("active");
    searchInput.value = "";
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle("active");
    // Toggle hamburger animation if needed
    this.classList.toggle("active");
}

// Function to close mobile menu
function closeMobileMenu() {
    hamburgerMenu.classList.remove("active");
    document.body.style.overflow = "";
}

// Add event listeners
searchIcon.addEventListener("click", expandSearch);
searchClose.addEventListener("click", collapseSearch);
hamburgerMenu.addEventListener("click", toggleMobileMenu);

// Close search on pressing Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (searchContainer.classList.contains("active")) {
            collapseSearch();
        }
        if (navLinks.classList.contains("active")) {
            toggleMobileMenu();
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const searchContainer = document.querySelector(".search-container");
    const searchIcon = document.querySelector(".search-icon");
    const searchClose = document.querySelector(".search-close");
    const hamburgerMenu = document.querySelector(".nav__menu");
    const navLinks = document.querySelector(".nav__links");

    // Search functionality
    if (searchIcon && searchClose) {
        searchIcon.addEventListener("click", () => {
            searchContainer.classList.add("active");
        });

        searchClose.addEventListener("click", () => {
            searchContainer.classList.remove("active");
        });
    }

    // Hamburger menu functionality
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle("active");

            // Prevent scrolling when menu is open
            document.body.style.overflow = this.classList.contains("active")
                ? "hidden"
                : "";
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (
            hamburgerMenu.classList.contains("active") &&
            !mobileMenu.contains(e.target) &&
            !hamburgerMenu.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && hamburgerMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // Close button functionality
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Gallery Elements
    const gallerySlides = document.querySelectorAll(".gallery__slide");
    const prevButton = document.querySelector(".gallery__nav--prev");
    const nextButton = document.querySelector(".gallery__nav--next");
    const dots = document.querySelectorAll(".gallery__dot");
    const thumbs = document.querySelectorAll(".gallery__thumb");

    let currentSlide = 0;

    // Function to update slide
    function showSlide(index) {
        gallerySlides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));
        thumbs.forEach((thumb) => thumb.classList.remove("active"));

        currentSlide = (index + gallerySlides.length) % gallerySlides.length;
        gallerySlides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
        thumbs[currentSlide].classList.add("active");
    }

    // Navigation buttons
    if (prevButton) {
        prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
    }
    if (nextButton) {
        nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
    });

    // Thumbnail navigation
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => showSlide(index));
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
