document.addEventListener('DOMContentLoaded', () => {
    // Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Smooth reveal animation on scroll for panels
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const glassPanels = document.querySelectorAll('.glass-panel');
    glassPanels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(30px)';
        panel.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(panel);
    });

    console.log('Portfolio page script loaded successfully!');
});

// Copy Portfolio Link to Clipboard
function copyPortfolioLink() {
    const portfolioUrl = window.location.href;
    
    const showToast = () => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(portfolioUrl)
            .then(showToast)
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        const dummy = document.createElement('input');
        dummy.value = portfolioUrl;
        document.body.appendChild(dummy);
        dummy.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('Fallback failed: ', err);
        }
        document.body.removeChild(dummy);
    }
}
