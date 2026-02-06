class HealthyFoodGenerator extends HTMLElement {
  constructor() {
    super();
    this.filter = 'all'; // Default filter
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'container');

    const leftColumn = document.createElement('div');
    leftColumn.setAttribute('class', 'left-column');

    const rightColumn = document.createElement('div');
    rightColumn.setAttribute('class', 'right-column');

    const title = document.createElement('h1');
    title.textContent = 'Singaporean Food Generator';

    const foodDisplay = document.createElement('div');
    foodDisplay.setAttribute('class', 'food-display');

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate Food';
    generateButton.addEventListener('click', () => this.generateFood(foodDisplay));

    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.classList.add('active');
    allButton.addEventListener('click', () => this.setFilter('all', foodDisplay, allButton, spicyButton, nonSpicyButton));

    const spicyButton = document.createElement('button');
    spicyButton.textContent = 'Spicy';
    spicyButton.addEventListener('click', () => this.setFilter('spicy', foodDisplay, allButton, spicyButton, nonSpicyButton));

    const nonSpicyButton = document.createElement('button');
    nonSpicyButton.textContent = 'Non-Spicy';
    nonSpicyButton.addEventListener('click', () => this.setFilter('non-spicy', foodDisplay, allButton, spicyButton, nonSpicyButton));

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
        background-image: url('background.jpg');
        background-size: cover;
        background-position: center;
      }
      .container {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4); /* Subtler overlay */
      }
      .left-column {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent panel */
        width: 200px;
        align-items: center;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-right: 20px;
      }
      .left-column button {
        width: 100%;
        padding: 15px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        font-size: 16px;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
      }
      .left-column button.active {
        background-color: #e50914;
        color: white;
        border-color: #e50914;
      }
      .left-column button:hover {
        background-color: #f5f5f5;
      }
      .right-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        font-family: sans-serif;
        text-align: center;
        color: #fff; /* White text for visibility */
      }
      h1 {
          font-size: 48px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
      }
      .food-display {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        min-height: 50px;
      }
      .right-column button {
        padding: 15px 30px;
        border: none;
        border-radius: 5px;
        background-color: #e50914;
        color: white;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }
      .right-column button:hover {
        box-shadow: 0 0 10px #e50914, 0 0 20px #e50914, 0 0 30px #e50914;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(leftColumn);
    wrapper.appendChild(rightColumn);

    leftColumn.appendChild(allButton);
    leftColumn.appendChild(spicyButton);
    leftColumn.appendChild(nonSpicyButton);

    rightColumn.appendChild(title);
    rightColumn.appendChild(foodDisplay);
    rightColumn.appendChild(generateButton);

    this.foods = [
      { name: 'Hainanese Chicken Rice', spicy: false },
      { name: 'Chilli Crab', spicy: true },
      { name: 'Laksa', spicy: true },
      { name: 'Char Kway Teow', spicy: false },
      { name: 'Hokkien Prawn Mee', spicy: false },
      { name: 'Bak Kut Teh', spicy: false },
      { name: 'Satay', spicy: false },
      { name: 'Nasi Lemak', spicy: true },
      { name: 'Roti Prata', spicy: false },
      { name: 'Fish Head Curry', spicy: true }
    ];
    this.generateFood(foodDisplay);
  }

  setFilter(filter, container, ...buttons) {
    this.filter = filter;
    buttons.forEach((btn, index) => {
        const filters = ['all', 'spicy', 'non-spicy'];
        if(filters[index] === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    gtag('event', 'filter_change', { 'food_preference': filter });
    this.generateFood(container);
  }

  generateFood(container) {
    let filteredFoods = this.foods;
    if (this.filter === 'spicy') {
      filteredFoods = this.foods.filter(food => food.spicy);
    } else if (this.filter === 'non-spicy') {
      filteredFoods = this.foods.filter(food => !food.spicy);
    }

    if (filteredFoods.length === 0) {
        container.textContent = 'No food available for this selection!';
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    container.textContent = filteredFoods[randomIndex].name;
  }
}

customElements.define('healthy-food-generator', HealthyFoodGenerator);
