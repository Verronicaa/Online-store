const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

const items = [
    {
        title: "Shampoo Kevin Murphy",
        description: "For fine Coloured hair",
        tags: ["hair"],
        price: '55.80',
        rating: 4.8,
        img: "./img/kevin.jpg",
    },
    {
        title: "Body Cream Rituals",
        description: "Magic touch body cream",
        tags: ["skin"],
        price: '36.45',
        rating: 4.9,
        img: "./img/ritual-body.jpg",
    },
    {
        title: "Hair Milk Davines",
        description: "Beauty Treatment, All Hair Types",
        tags: ["hair"],
        price: '33',
        rating: 4.7,
        img: "./img/davines.jpg",
    },
    {
        title: "Lipstick Becca",
        description: "Ultimate Lipstick Love",
        tags: ["makeup"],
        price: '24.30',
        rating: 4.4,
        img: "./img/becca.jpg",
    },
    {
        title: "Shower Gel Zielinski & Rozen",
        description: "Black Pepper & Amber, Neroli",
        tags: ["skin"],
        price: '25.50',
        rating: 4.9,
        img: "./img/zielinski.jpg",
    },
    {
        title: "Bronzing Cream Les Beiges Chanel",
        description: "030 Soleil Tan Bronze Universel",
        tags: ["makeup"],
        price: '46.50',
        rating: 5,
        img: "./img/chanel.jpg",
    },
    {
        title: "Shampoo & Conditioner Keune",
        description: "Absolute Volume & Satin oil",
        tags: ["hair"],
        price: '66.99',
        rating: 4.2,
        img: "./img/keune.jpg",
    },
    {
        title: "The Ordinary Cleanser",
        description: "Squalane Based Faced Cleanser",
        tags: ["skin"],
        price: '29.90',
        rating: 4.8,
        img: "./img/ordinary.jpg",
    },
    {
        title: "Lipstick Dior Maximazer",
        description: "004 Hyaluronic Lip Plumper",
        tags: ["makeup"],
        price: '46.95',
        rating: 4.9,
        img: "./img/dior.jpg",
    },
    {
        title: "Hylamide Glow ",
        description: "Radiance Booster",
        tags: ["skin"],
        price: '21.93',
        rating: 4.4,
        img: "./img/glow.jpg",
    },

    {
        title: "Gisou Hair Oil",
        description: "Honey infused hair oil",
        tags: ["hair"],
        price: '77',
        rating: 4.9,
        img: "./img/gisou.jpg",
    },
    {
        title: "Sesderma C-vit",
        description: "Liposomal Serum",
        tags: ["skin"],
        price: '39.95',
        rating: 4.3,
        img: "./img/sesderma.jpg",
    },
    {
        title: "Lotion & Cream Kevin Murphy",
        description: "Anti-frizz curl creme & Lotion",
        tags: ["hair"],
        price: '97.95',
        rating: 4.6,
        img: "./img/kevin-murphy.jpg",
    },
    {
        title: "The Ordinary Peeling Solution",
        description: "AHA 30% + BHA 2% Peeling Solution",
        tags: ["skin"],
        price: '10.95',
        rating: 4.4,
        img: "./img/ordinary-peeling.jpg",
    }
];

function prepareShopItem(shopItem) {
    const { title, description, tags, price, rating, img } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector('h1').textContent = title;
    item.querySelector('p').textContent = description;
    item.querySelector('img').src = img;
    item.querySelector('.price').textContent = `€${price}`;

    const ratingContainer = item.querySelector('.rating');
    const roundedRating = Math.round(rating);

    for (let i = 1; i < roundedRating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
    });

    return item;
}

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Nothing found";
    }
}

renderItems(currentState);

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector('#sort');

sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive": {
            currentState.sort((a, b) => b.price - a.price);
            break;
        }
        case "cheap": {
            currentState.sort((a, b) => a.price - b.price);
            break;
        }
        case "rating": {
            currentState.sort((a, b) => b.rating - a.rating);
            break;
        }
        case "alphabet": {
            currentState.sort((a, b) => sortByAlphabet(a, b));
            break;
        }
    }
    renderItems(currentState);
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;

    renderItems(currentState);
}

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);
