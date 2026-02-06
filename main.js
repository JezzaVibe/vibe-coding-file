const healthyFoods = [
  {
    name: "Bibimbap",
    description: "A Korean rice bowl topped with an array of seasoned vegetables, a fried egg, and gochujang sauce. A balanced and colorful meal.",
    image: "https://i.imgur.com/2O8a7Y4.png"
  },
  {
    name: "Sushi (Sashimi)",
    description: "Fresh, high-quality raw fish served without rice. It's rich in omega-3 fatty acids and protein.",
    image: "https://i.imgur.com/gIsy7lV.png"
  },
  {
    name: "Pho",
    description: "A Vietnamese noodle soup with a flavorful broth, fresh herbs, and lean meat. A light yet satisfying option.",
    image: "https://i.imgur.com/I2kM3tX.png"
  },
  {
    name: "Tom Yum Soup",
    description: "A hot and sour Thai soup with shrimp, lemongrass, and galangal. Known for its bold flavors and health benefits.",
    image: "https://i.imgur.com/XM4B3dT.png"
  },
  {
    name: "Miso Soup",
    description: "A traditional Japanese soup made from dashi stock and miso paste. It's light, savory, and packed with probiotics.",
    image: "https://i.imgur.com/Q21A1cE.png"
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
          transition: transform 0.3s ease;
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
  }
}

customElements.define('food-card', FoodCard);

const generateBtn = document.getElementById('generate-btn');
const foodContainer = document.getElementById('food-container');

generateBtn.addEventListener('click', () => {
  // Add the shaking animation
  foodContainer.classList.add('shaking');

  // Wait for the animation to finish
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * healthyFoods.length);
    const randomFood = healthyFoods[randomIndex];

    foodContainer.innerHTML = `
      <food-card 
        name="${randomFood.name}" 
        description="${randomFood.description}" 
        image="${randomFood.image}">
      </food-card>
    `;

    // Remove the shaking class so it can be re-triggered
    foodContainer.classList.remove('shaking');
  }, 500); // 500ms matches the animation duration
});
