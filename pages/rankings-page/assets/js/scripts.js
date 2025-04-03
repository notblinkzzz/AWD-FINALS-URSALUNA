// Language data with different sorting criteria
const languageData = {
    bySpeakers: [
        { name: "Mandarin", speakers: 1118, countries: 13, growth: 2.5, icon: "C", color: "bg-red-500" },
        { name: "Spanish", speakers: 534, countries: 31, growth: 1.8, icon: "S", color: "bg-blue-500" },
        { name: "English", speakers: 508, countries: 67, growth: 1.2, icon: "E", color: "bg-green-500" },
        { name: "Hindi", speakers: 497, countries: 4, growth: 2.1, icon: "H", color: "bg-yellow-500" },
        { name: "Arabic", speakers: 422, countries: 25, growth: 1.5, icon: "A", color: "bg-purple-500" },
        { name: "Bengali", speakers: 265, countries: 4, growth: 1.9, icon: "B", color: "bg-pink-500" },
        { name: "Portuguese", speakers: 258, countries: 10, growth: 1.3, icon: "P", color: "bg-orange-500" },
        { name: "Russian", speakers: 258, countries: 16, growth: 1.1, icon: "R", color: "bg-indigo-500" }
    ],
    byCountries: [
        { name: "English", speakers: 508, countries: 67, growth: 1.2, icon: "E", color: "bg-green-500" },
        { name: "Spanish", speakers: 534, countries: 31, growth: 1.8, icon: "S", color: "bg-blue-500" },
        { name: "Arabic", speakers: 422, countries: 25, growth: 1.5, icon: "A", color: "bg-purple-500" },
        { name: "Russian", speakers: 258, countries: 16, growth: 1.1, icon: "R", color: "bg-indigo-500" },
        { name: "Mandarin", speakers: 1118, countries: 13, growth: 2.5, icon: "C", color: "bg-red-500" },
        { name: "Portuguese", speakers: 258, countries: 10, growth: 1.3, icon: "P", color: "bg-orange-500" },
        { name: "Hindi", speakers: 497, countries: 4, growth: 2.1, icon: "H", color: "bg-yellow-500" },
        { name: "Bengali", speakers: 265, countries: 4, growth: 1.9, icon: "B", color: "bg-pink-500" }
    ],
    byGrowth: [
        { name: "Mandarin", speakers: 1118, countries: 13, growth: 2.5, icon: "C", color: "bg-red-500" },
        { name: "Hindi", speakers: 497, countries: 4, growth: 2.1, icon: "H", color: "bg-yellow-500" },
        { name: "Bengali", speakers: 265, countries: 4, growth: 1.9, icon: "B", color: "bg-pink-500" },
        { name: "Spanish", speakers: 534, countries: 31, growth: 1.8, icon: "S", color: "bg-blue-500" },
        { name: "Arabic", speakers: 422, countries: 25, growth: 1.5, icon: "A", color: "bg-purple-500" },
        { name: "Portuguese", speakers: 258, countries: 10, growth: 1.3, icon: "P", color: "bg-orange-500" },
        { name: "English", speakers: 508, countries: 67, growth: 1.2, icon: "E", color: "bg-green-500" },
        { name: "Russian", speakers: 258, countries: 16, growth: 1.1, icon: "R", color: "bg-indigo-500" }
    ]
};

function updateDisplay(sortBy) {
    const container = document.querySelector('.language-container');
    container.innerHTML = '';

    languageData[sortBy].forEach((lang, index) => {
        const rankColor = index === 0 ? 'text-secondary' :
                         index === 1 ? 'text-zinc-300' :
                         index === 2 ? 'text-[#CD7F32]' : 'text-white';

        const itemContainer = document.createElement('div');
        itemContainer.className = 'flex w-full gap-3';

        const rankContainer = document.createElement('div');
        rankContainer.className = 'w-[70px] xl:w-[90px] lg:w-[80px] md:w-[75px] bg-third border-2 border-primary rounded-xl text-center shadow-[0px_3px_0px_0px_#063f5c] flex items-center justify-center min-h-[50px] xl:min-h-[60px] lg:min-h-[55px] md:min-h-[50px]';

        const rankNumber = document.createElement('p');
        rankNumber.className = `${rankColor} font-black xl:text-6xl lg:text-5xl md:text-4xl text-4xl leading-none w-full px-2`;
        rankNumber.style.textShadow = '1px 1px 0px rgba(0, 0, 0, 0.2)';
        rankNumber.textContent = index + 1;
        rankContainer.appendChild(rankNumber);

        const langContainer = document.createElement('div');
        langContainer.className = 'flex flex-1 bg-third border-2 border-primary xl:py-3 lg:py-3 md:py-2 py-2 xl:px-4 lg:px-4 md:px-3 px-2 rounded-xl justify-between shadow-[0px_3px_0px_0px_#063f5c] text-white';

        const langNameSection = document.createElement('div');
        langNameSection.className = 'flex gap-2 items-center';

        const langIcon = document.createElement('span');
        langIcon.className = `xl:w-12 xl:h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 w-7 h-7 flex items-center justify-center ${lang.color} text-white font-bold rounded-full xl:text-xl lg:text-lg md:text-base text-sm`;
        langIcon.textContent = lang.icon;

        const langName = document.createElement('p');
        langName.className = 'xl:text-2xl lg:text-xl md:text-lg text-base';
        langName.textContent = lang.name;

        langNameSection.appendChild(langIcon);
        langNameSection.appendChild(langName);

        const valueSection = document.createElement('div');
        valueSection.className = 'flex items-center xl:pr-4 lg:pr-4 md:pr-3 pr-2';

        const valueSpan = document.createElement('span');
        valueSpan.className = 'xl:text-2xl lg:text-xl md:text-lg text-base';

        const value = sortBy === 'bySpeakers' ? lang.speakers.toLocaleString() :
                     sortBy === 'byCountries' ? lang.countries :
                     lang.growth.toFixed(1) + '%';
        valueSpan.textContent = value;

        valueSection.appendChild(valueSpan);

        langContainer.appendChild(langNameSection);
        langContainer.appendChild(valueSection);

        itemContainer.appendChild(rankContainer);
        itemContainer.appendChild(langContainer);

        container.appendChild(itemContainer);
    });

    const valueDisplay = document.querySelector('.value-display');
    valueDisplay.textContent = sortBy === 'bySpeakers' ? 'SPEAKERS (M)' :
                             sortBy === 'byCountries' ? 'COUNTRIES' :
                             'GROWTH (%)';
}

const sortButton = document.getElementById('sortButton');
const sortMenu = document.getElementById('sortMenu');
const chevronIcon = sortButton.querySelector('.fa-chevron-down');
const sortButtonIcon = sortButton.querySelector('i:not(.fa-chevron-down)');
const sortButtonText = sortButton.querySelector('.sort-text');

sortButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sortMenu.classList.toggle('hidden');
    chevronIcon.style.transform = sortMenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
});

document.addEventListener('click', (e) => {
    if (!sortButton.contains(e.target) && !sortMenu.contains(e.target)) {
        sortMenu.classList.add('hidden');
        chevronIcon.style.transform = 'rotate(0deg)';
    }
});

sortMenu.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const sortBy = button.getAttribute('data-sort');
        const iconClass = button.getAttribute('data-icon');
        const buttonText = button.querySelector('span').textContent;

        sortButtonIcon.className = `fas ${iconClass} text-lg`;
        sortButtonText.textContent = buttonText;

        updateDisplay(sortBy);
        sortMenu.classList.add('hidden');
        chevronIcon.style.transform = 'rotate(0deg)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay('bySpeakers');
});