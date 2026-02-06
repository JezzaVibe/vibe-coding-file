const healthyFoods = [
  {
    name: "Thunder Tea Rice (Lei Cha)",
    description: "A healthy and flavorful Hakka dish featuring a variety of vegetables, tofu, and peanuts served with rice and a savory tea soup.",
    image: "https://i.imgur.com/3h43eU1.png"
  },
  {
    name: "Fish Soup",
    description: "A light and nutritious soup made with fresh fish slices, vegetables, and tofu. A popular choice for a healthy lunch.",
    image: "https://i.imgur.com/kDPiJ7S.png"
  },
  {
    name: "Yong Tau Foo",
    description: "A clear soup with a variety of stuffed tofu and vegetables. You can choose your own ingredients, making it a customizable healthy meal.",
    image: "https://i.imgur.com/GA1kW2B.png"
  },
  {
    name: "Chapati with Dhal",
    description: "A North Indian staple of unleavened flatbread served with lentil curry. It's a good source of protein and fiber.",
    image: "https://i.imgur.com/pWp6JSt.png"
  },
  {
    name: "Chicken Rice (Steamed)",
    description: "Opt for the steamed version for a lower-fat meal. Served with a flavorful broth and chili sauce.",
    image: "https://i.imgur.com/sC5I3t7.png"
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
  const randomIndex = Math.floor(Math.random() * healthyFoods.length);
  const randomFood = healthyFoods[randomIndex];

  foodContainer.innerHTML = `
    <food-card 
      name="${randomFood.name}" 
      description="${randomFood.description}" 
      image="${randomFood.image}">
    </food-card>
  `;
});
