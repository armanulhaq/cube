// Get the DOM elements
const expandSearchButton = document.getElementById("expand-search");
const collapseSearchButton = document.getElementById("collapse-search");
const expandedSearchBar = document.getElementById("expanded-search-bar");
const mainHeader = document.getElementById("main-header");

// Toggle search function
function toggleSearch() {
    // If the search bar is currently hidden (main header is showing)
    if (expandedSearchBar.style.display === "none") {
        // Show search bar, hide main header
        expandedSearchBar.style.display = "block";
        mainHeader.style.display = "none";
    } else {
        // Hide search bar, show main header
        expandedSearchBar.style.display = "none";
        mainHeader.style.display = "flex";
    }
}

// Add event listeners
expandSearchButton.addEventListener("click", toggleSearch);
collapseSearchButton.addEventListener("click", toggleSearch);

document.addEventListener("DOMContentLoaded", function () {
    // Gallery variables
    let currentSlide = 0;
    const slides = document.querySelectorAll(".gallery-main-image");
    const dots = document.querySelectorAll(".gallery-dot");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const totalSlides = slides.length;

    // Initialize gallery
    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide) => slide.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // Show selected slide
        slides[index].classList.add("active");
        dots[index].classList.add("active");

        // Update current slide
        currentSlide = index;
    }

    // Next slide
    document.querySelector(".next-btn").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    // Previous slide
    document.querySelector(".prev-btn").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });

    // Thumbnail navigation
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function () {
            showSlide(index);
        });
    });

    // Initialize first slide
    showSlide(0);

    // Radio button functionality
    const flavorRadios = document.querySelectorAll('input[name="flavor"]');
    const purchaseRadios = document.querySelectorAll(
        'input[name="purchase-type"]'
    );
    const addToCartBtn = document.querySelector(".add-to-cart");

    // Cart link options - 9 combinations (3 flavors x 3 purchase types)
    const cartLinks = {
        "original-single": "https://example.com/cart/original-single",
        "original-double": "https://example.com/cart/original-double",
        "original-once": "https://example.com/cart/original-once",
        "matcha-single": "https://example.com/cart/matcha-single",
        "matcha-double": "https://example.com/cart/matcha-double",
        "matcha-once": "https://example.com/cart/matcha-once",
        "cacao-single": "https://example.com/cart/cacao-single",
        "cacao-double": "https://example.com/cart/cacao-double",
        "cacao-once": "https://example.com/cart/cacao-once",
    };

    // Update cart link based on selected options
    function updateCartLink() {
        const selectedFlavor = document.querySelector(
            'input[name="flavor"]:checked'
        ).value;
        const selectedPurchase = document.querySelector(
            'input[name="purchase-type"]:checked'
        ).value;
        const cartKey = `${selectedFlavor}-${selectedPurchase}`;

        addToCartBtn.href = cartLinks[cartKey];
        console.log("Cart link updated to:", cartLinks[cartKey]);
    }

    // Add event listeners to radio buttons
    flavorRadios.forEach((radio) => {
        radio.addEventListener("change", updateCartLink);
    });

    purchaseRadios.forEach((radio) => {
        radio.addEventListener("change", updateCartLink);
    });

    // Initialize cart link
    updateCartLink();
});

// Create overlay element
const overlay = document.createElement("div");
overlay.className = "menu-overlay";
document.body.appendChild(overlay);

// Get DOM elements
const hamburgerMenu = document.getElementById("hamburger-menu");
const mainHeaderOptions = document.querySelector(".main-header-options");

// Toggle menu function
function toggleMenu() {
    hamburgerMenu.classList.toggle("active");
    mainHeaderOptions.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = mainHeaderOptions.classList.contains(
        "active"
    )
        ? "hidden"
        : "";
}

// Event listeners
hamburgerMenu.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Close menu on window resize if open
window.addEventListener("resize", () => {
    if (
        window.innerWidth > 768 &&
        mainHeaderOptions.classList.contains("active")
    ) {
        toggleMenu();
    }
});
