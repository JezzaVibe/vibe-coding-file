const healthyFoods = [
  {
    name: "Bibimbap",
    description: "A Korean rice bowl topped with an array of seasoned vegetables, a fried egg, and gochujang sauce. A balanced and colorful meal.",
    image: "https://i.imgur.com/2O8a7Y4.png",
    cuisine: "Korean"
  },
  {
    name: "Sushi (Sashimi)",
    description: "Fresh, high-quality raw fish served without rice. It's rich in omega-3 fatty acids and protein.",
    image: "https://i.imgur.com/gIsy7lV.png",
    cuisine: "Japanese"
  },
  {
    name: "Pho",
    description: "A Vietnamese noodle soup with a flavorful broth, fresh herbs, and lean meat. A light yet satisfying option.",
    image: "https://i.imgur.com/I2kM3tX.png",
    cuisine: "Vietnamese"
  },
  {
    name: "Tom Yum Soup",
    description: "A hot and sour Thai soup with shrimp, lemongrass, and galangal. Known for its bold flavors and health benefits.",
    image: "https://i.imgur.com/XM4B3dT.png",
    cuisine: "Thai"
  },
  {
    name: "Miso Soup",
    description: "A traditional Japanese soup made from dashi stock and miso paste. It's light, savory, and packed with probiotics.",
    image: "https://i.imgur.com/Q21A1cE.png",
    cuisine: "Japanese"
  },
  {
    name: "Kimchi Jjigae",
    description: "A classic Korean stew made with kimchi, tofu, and meat or seafood. A flavorful and spicy comfort food.",
    image: "https://i.imgur.com/9C4T9p0.png",
    cuisine: "Korean"
  },
  {
    name: "Goi Cuon (Spring Rolls)",
    description: "Fresh Vietnamese spring rolls filled with shrimp, herbs, and rice vermicelli. A light and healthy appetizer.",
    image: "https://i.imgur.com/6QCM2zJ.png",
    cuisine: "Vietnamese"
  },
  {
    name: "Green Curry",
    description: "A sweet and spicy Thai curry with coconut milk, green chilies, and vegetables. A fragrant and flavorful dish.",
    image: "https://i.imgur.com/gGvJ03v.png",
    cuisine: "Thai"
  }
];

class FoodCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const name = this.getAttribute('name');
    const description = this.getAttribute('description');
    const image = this.getAttribute('image');

    this.shadowRoot.innerHTML = `
      <style>
        .food-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.15);
          max-width: 400px;
          overflow: hidden;
          transition: transform 0.3s ease, opacity 0.5s ease-in-out;
          opacity: 0;
        }
        .food-card:hover {
          transform: translateY(-5px);
        }
        .food-card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        .food-card-content {
          padding: 20px;
        }
        h3 {
          margin: 0 0 10px 0;
          color: #333;
        }
        p {
          margin: 0;
          color: #666;
        }
      </style>
      <div class="food-card">
        <img src="${image}" alt="${name}">
        <div class="food-card-content">
          <h3>${name}</h3>
          <p>${description}</p>
        </div>
      </div>
    `;
    
    // Trigger the fade-in animation
    setTimeout(() => {
      this.shadowRoot.querySelector('.food-card').style.opacity = 1;
    }, 10);
  }
}

customElements.define('food-card', FoodCard);

const generateBtn = document.getElementById('generate-btn');
const surpriseBtn = document.getElementById('surprise-btn');
const foodContainer = document.getElementById('food-container');
const cuisineFilter = document.getElementById('cuisine-filter');
const searchInput = document.getElementById('search-input');

function generateFood(useFilters = true) {
  let filteredFoods = healthyFoods;

  if (useFilters) {
    const selectedCuisine = cuisineFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    if (selectedCuisine !== 'all') {
      filteredFoods = filteredFoods.filter(food => food.cuisine === selectedCuisine);
    }

    if (searchTerm) {
      filteredFoods = filteredFoods.filter(food => food.name.toLowerCase().includes(searchTerm));
    }
  }

  if (filteredFoods.length === 0) {
    foodContainer.innerHTML = "<p>No dishes match your criteria.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredFoods.length);
  const randomFood = filteredFoods[randomIndex];

  foodContainer.innerHTML = `
    <food-card 
      name="${randomFood.name}" 
      description="${randomFood.description}" 
      image="${randomFood.image}">
    </food-card>
  `;
}

function handleGeneration(useFilters) {
  foodContainer.classList.add('shaking');
  setTimeout(() => {
    generateFood(useFilters);
    foodContainer.classList.remove('shaking');
  }, 500);
}

generateBtn.addEventListener('click', () => handleGeneration(true));
surpriseBtn.addEventListener('click', () => handleGeneration(false));

searchInput.addEventListener('input', () => generateFood(true));
cuisineFilter.addEventListener('change', () => generateFood(true));
