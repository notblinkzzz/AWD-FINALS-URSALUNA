const menuIcon = document.getElementById("menu-icon");
const menuItems = document.getElementById("menu-items");
const ratingStars = document.getElementById("ratingStars");
const ratingInput = document.getElementById("rating");

document.addEventListener('DOMContentLoaded', function() {
    const starLabels = document.querySelectorAll('.star-rating label');
    const radioInputs = document.querySelectorAll('.star-rating input');
    let currentRating = 0;

    function updateStars(index, isHover = false) {
        starLabels.forEach((label, i) => {
            const star = label.querySelector('i');
            if (i <= index) {
                star.classList.remove('text-gray-400');
                star.classList.add('text-yellow-400');
            } else {
                if (!isHover || i > currentRating - 1) {
                    star.classList.remove('text-yellow-400');
                    star.classList.add('text-gray-400');
                }
            }
        });
    }

    radioInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            currentRating = index + 1;
            updateStars(index);
        });
    });

    starLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', () => {
            updateStars(index, true);
        });

        label.addEventListener('mouseleave', () => {
            if (currentRating === 0) {
                updateStars(-1);
            } else {
                updateStars(currentRating - 1);
            }
        });
    });

    const feedbackForm = document.getElementById('feedbackForm');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;
        const rating = currentRating;
        const date = new Date().toLocaleDateString();

        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        
        reviews.unshift({
            name,
            review,
            rating,
            date
        });

        localStorage.setItem('reviews', JSON.stringify(reviews));

        alert('Thank you for your review!');
        
        feedbackForm.reset();
        updateStars(-1);
        currentRating = 0;

        window.location.href = './index.html';
    });
});

menuIcon.addEventListener("click", () => {
    menuItems.classList.toggle("hidden");
});





