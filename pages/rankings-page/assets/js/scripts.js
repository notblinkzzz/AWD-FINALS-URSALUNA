// Sample platform data with default ratings
const defaultPlatforms = [
  { id: 1, name: "Duolingo", averageRating: 4.5, popularity: 1000, description: "A free language-learning platform with a gamified approach. Features bite-sized lessons, daily streaks, and a mobile app." },
  { id: 2, name: "Memrise", averageRating: 4.3, popularity: 800, description: "Uses spaced repetition and memory techniques to help users learn languages effectively. Features video clips of native speakers." },
  { id: 3, name: "Babbel", averageRating: 4.2, popularity: 600, description: "Focuses on conversation skills with real-world dialogues. Offers structured lessons and speech recognition technology." },
  { id: 4, name: "Busuu", averageRating: 4.0, popularity: 400, description: "Combines AI-powered learning with community features. Offers official language certificates and personalized study plans." },
  { id: 5, name: "Rosetta Stone", averageRating: 3.8, popularity: 300, description: "Uses immersive learning techniques with no translations. Focuses on natural language acquisition through visual and audio cues." }
];

let platforms = [];

// Initialize the display when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Start with default platforms
  displayPlatforms(defaultPlatforms);
  // Then try to fetch from API
  fetchPlatforms("rating");
});

// Listen for review submissions
window.addEventListener('reviewSubmitted', () => {
  // Refresh the rankings data
  const orderBy = document.getElementById('sortBy').value;
  fetchPlatforms(orderBy);
});

// Fetch platforms data from the API
async function fetchPlatforms(orderBy) {
  try {
    const response = await fetch(`http://localhost:3000/api/LanguageLearner/ranking-sorting/${orderBy}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const apiPlatforms = await response.json();
    
    // Merge API data with default data for platforms that have no reviews
    const mergedPlatforms = apiPlatforms.map(platform => {
      const defaultPlatform = defaultPlatforms.find(dp => dp.name === platform.name);
      
      if (defaultPlatform) {
        // If it's a default platform, add the API reviews to default values
        const totalReviews = platform.popularity || 0; // Number of actual reviews
        const defaultReviews = defaultPlatform.popularity; // Number of default reviews
        
        // Calculate new average rating
        const defaultTotalRating = defaultPlatform.averageRating * defaultReviews;
        const actualTotalRating = (platform.averageRating || 0) * totalReviews;
        const newAverageRating = totalReviews > 0 ? 
          ((defaultTotalRating + actualTotalRating) / (defaultReviews + totalReviews)).toFixed(1) :
          defaultPlatform.averageRating;

        return {
          ...platform,
          averageRating: parseFloat(newAverageRating),
          popularity: defaultReviews + totalReviews
        };
      } else {
        // For new platforms (not in defaults), just use their actual values
        return {
          ...platform,
          averageRating: platform.averageRating || 0,
          popularity: platform.popularity || 0
        };
      }
    });
    
    platforms = mergedPlatforms;
    displayPlatforms(platforms);
  } catch (error) {
    console.error('Error fetching platforms:', error);
    // Keep showing default platforms if API fails
    displayPlatforms(defaultPlatforms);
  }
}

// Display platforms in the table
function displayPlatforms(platformList) {
  const platformTable = document.getElementById('platformTable');
  platformTable.innerHTML = '';

  platformList.forEach((platform, index) => {
    const row = document.createElement('tr');
    row.className = 'border-b hover:bg-gray-50 transition-colors duration-200';
    
    const rankColor = index === 0 ? 'text-secondary' :
                     index === 1 ? 'text-zinc-300' :
                     index === 2 ? 'text-[#CD7F32]' : 'text-gray-700';
    
    row.innerHTML = `
      <td class="p-4 ${rankColor} font-bold">${index + 1}</td>
      <td class="p-4 font-medium">${platform.name}</td>
      <td class="p-4">
        <div class="flex items-center">
          <span class="text-yellow-500 mr-1">★</span>
          ${platform.averageRating}
        </div>
      </td>
      <td class="p-4">${platform.popularity}</td>
      <td class="p-4 max-w-xl">${platform.description}</td>
    `;
    
    platformTable.appendChild(row);
  });
}

// Add event listener for the sort button
document.getElementById('sortButton').addEventListener('click', () => {
  const orderBy = document.getElementById('sortBy').value;
  fetchPlatforms(orderBy);
});