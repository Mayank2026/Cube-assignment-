// Gallery Images Data
const galleryImages = [
    'assets/arose.jpg',
    'assets/perf.jpg',
    'assets/bella.jpg',
    'assets/daisies.jpg',
    'assets/arose.jpg',
    'assets/perf.jpg',
    'assets/bella.jpg',
    'assets/daisies.jpg'
];

let currentImageIndex = 0;

// Initialize Gallery
function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const dotsContainer = document.getElementById('carouselDots');
    const thumbnailGrid = document.getElementById('thumbnailGrid');

    // Create dots
    galleryImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => changeImage(index));
        dotsContainer.appendChild(dot);
    });

    // Create thumbnails
    galleryImages.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Thumbnail ${index + 1}`;
        thumbnail.appendChild(imgElement);
        thumbnail.addEventListener('click', () => changeImage(index));
        thumbnailGrid.appendChild(thumbnail);
    });
}

// Change Image Function
function changeImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    const dots = document.querySelectorAll('.dot');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Update main image
    mainImage.src = galleryImages[index];

    // Update active states
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Previous Button
document.getElementById('prevBtn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    changeImage(currentImageIndex);
});

// Next Button
document.getElementById('nextBtn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    changeImage(currentImageIndex);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// Subscription Toggle Functionality
const singleSubRadio = document.getElementById('singleSub');
const doubleSubRadio = document.getElementById('doubleSub');
const singleSubscription = document.getElementById('singleSubscription');
const doubleSubscription = document.getElementById('doubleSubscription');

function toggleSubscriptions() {
    if (singleSubRadio.checked) {
        singleSubscription.classList.remove('collapsed');
        doubleSubscription.classList.add('collapsed');
    } else if (doubleSubRadio.checked) {
        singleSubscription.classList.add('collapsed');
        doubleSubscription.classList.remove('collapsed');
    }
    updateAddToCartLink();
}

singleSubRadio.addEventListener('change', toggleSubscriptions);
doubleSubRadio.addEventListener('change', toggleSubscriptions);

// Fragrance Selection for Single Subscription
document.querySelectorAll('#singleSubscription .fragrance-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('#singleSubscription .fragrance-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;
        updateAddToCartLink();
    });
});

// Fragrance Selection for Double Subscription - Fragrance 1
document.querySelectorAll('#doubleSubscription .fragrance-options:first-of-type .fragrance-option').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.closest('.fragrance-options');
        parent.querySelectorAll('.fragrance-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;
        updateAddToCartLink();
    });
});

// Fragrance Selection for Double Subscription - Fragrance 2
document.querySelectorAll('#doubleSubscription .fragrance-options:last-of-type .fragrance-option').forEach(option => {
    option.addEventListener('click', function() {
        const parent = this.closest('.fragrance-options');
        parent.querySelectorAll('.fragrance-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;
        updateAddToCartLink();
    });
});

// Update Add to Cart Link Function
function updateAddToCartLink() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    let subscriptionType = '';
    let fragrance = '';
    let fragrance2 = '';

    // Determine subscription type
    if (singleSubRadio.checked) {
        subscriptionType = 'single';
        const selectedFragrance = document.querySelector('#singleSubscription input[name="fragrance"]:checked');
        fragrance = selectedFragrance ? selectedFragrance.value : 'original';
        
        // Update button with single subscription link
        addToCartBtn.onclick = () => {
            window.location.href = `https://example.com/cart?subscription=${subscriptionType}&fragrance=${fragrance}`;
        };
        console.log(`Cart Link: subscription=${subscriptionType}&fragrance=${fragrance}`);
        
    } else if (doubleSubRadio.checked) {
        subscriptionType = 'double';
        const selectedFragrance1 = document.querySelector('#doubleSubscription input[name="fragrance1"]:checked');
        const selectedFragrance2 = document.querySelector('#doubleSubscription input[name="fragrance2"]:checked');
        fragrance = selectedFragrance1 ? selectedFragrance1.value : 'original';
        fragrance2 = selectedFragrance2 ? selectedFragrance2.value : 'original';
        
        // Update button with double subscription link
        addToCartBtn.onclick = () => {
            window.location.href = `https://example.com/cart?subscription=${subscriptionType}&fragrance1=${fragrance}&fragrance2=${fragrance2}`;
        };
        console.log(`Cart Link: subscription=${subscriptionType}&fragrance1=${fragrance}&fragrance2=${fragrance2}`);
    }
}

// Accordion Functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
            const icon = i.querySelector('.accordion-icon');
            icon.textContent = '+';
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            const icon = header.querySelector('.accordion-icon');
            icon.textContent = '−';
        } else {
            const icon = header.querySelector('.accordion-icon');
            icon.textContent = '+';
        }
    });
});

// Counter Animation for Stats Section
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 30; // Animation speed

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const updateCount = () => {
            const increment = target / speed;

            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 50);
            } else {
                counter.textContent = target;
            }
        };

        updateCount();
    });
}

// Intersection Observer for Stats Animation
const statsSection = document.getElementById('statsSection');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateCounters();
            statsAnimated = true;
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .service-card, .accordion-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Newsletter Form Submission
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with: ${email}`);
    e.target.reset();
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    updateAddToCartLink();
});