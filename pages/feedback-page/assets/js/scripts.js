const menuIcon = document.getElementById("menu-icon");
const menuItems = document.getElementById("menu-items");
const ratingStars = document.getElementById("ratingStars");
const ratingInput = document.getElementById("rating");

document.addEventListener('DOMContentLoaded', () => {
    // Load platforms when page loads
    loadPlatforms();
    setupStarRating();

    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', handleReviewSubmission);
    }
});

async function loadPlatforms() {
    try {
        const response = await axios.get('http://localhost:3000/api/LanguageLearner/platforms');
        console.log('All platforms:', response.data);
        // Only show validated platforms
        const validatedPlatforms = response.data.filter(platform => platform.validated === true);
        console.log('Validated platforms:', validatedPlatforms);
        
        const platformSelect = document.getElementById('platform');
        platformSelect.innerHTML = '<option value="">Select Platform</option>';

        if (validatedPlatforms.length === 0) {
            console.log('No validated platforms available');
            return;
        }

        validatedPlatforms.forEach(platform => {
            const option = document.createElement('option');
            option.value = platform.id;
            option.textContent = platform.name;
            platformSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading platforms:', error);
        alert('Error loading platforms. Please try again.');
    }
}

function setupStarRating() {
    const stars = document.querySelectorAll('.star-rating label');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            // Highlight current star and all previous stars
            for (let i = 0; i <= index; i++) {
                stars[i].querySelector('i').classList.remove('text-gray-400');
                stars[i].querySelector('i').classList.add('text-yellow-400');
            }
        });

        star.addEventListener('mouseout', () => {
            // Remove highlight if star is not selected
            stars.forEach(s => {
                if (!s.previousElementSibling.checked) {
                    s.querySelector('i').classList.remove('text-yellow-400');
                    s.querySelector('i').classList.add('text-gray-400');
                }
            });
        });
    });
}

async function handleReviewSubmission(e) {
    e.preventDefault();

    const platformId = document.getElementById('platform').value;
    const review = document.getElementById('review').value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value;

    // Get user ID from localStorage or session
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        alert('Please log in to submit a review');
        return;
    }

    if (!platformId || !review || !rating) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/LanguageLearner/reviews', {
            platformId: parseInt(platformId),
            userId: userId,
            comment: review,
            rating: parseInt(rating)
        });

        alert('Review submitted successfully!');
        e.target.reset();
        // Reset star rating display
        document.querySelectorAll('.star-rating i').forEach(star => {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-400');
        });
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Error submitting review. Please try again.');
    }
}

menuIcon.addEventListener("click", () => {
    menuItems.classList.toggle("hidden");
});





