This is my solution to [Frontend Mentor REST Countries API with color theme switcher challenge](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

---

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

The challenge is to integrate with the [REST Countries API](https://restcountries.com/) to pull country data and display it like in the designs.

### The challenge

**User should be able to:**

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode (optional)

### Links

- [Solution](https://github.com/NabillaTrisnani/frontendmentor_rest-country)
- [Live Preview](https://nabillatrisnani-rest-country.netlify.app/)

## My process

### Built with:

- HTML5
- SCSS
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/docs/en/v6/getting-started/installation)
- [REST COUNTRIES](https://restcountries.com/)

### What I learned

- GET data from API with React Hooks.

```
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);

useEffect(() => {
  getData();
}, [])

const getData = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(
    (results) => {
      setIsLoaded(true);
      setItems(results);
      // console.log(results)
    }
  )
}
```

- GET parameter with `useParams()`.

```
import { useParams } from 'react-router-dom';

const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);

let { name } = useParams();

useEffect(() => {
  fetch(`https://restcountries.com/v3.1/alpha/${name}`)
    .then(res => res.json())
    .then(
    (results) => {
      setIsLoaded(true);
      setItems(results);
      console.log(results);
    }
  )
}, [name])
```

- Filtering data.

```
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);
const [searchInput, setSearchInput] = useState("");
const [selectInput, setSelectInput] = useState("");
const regionList = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const handleChangeInput = (e) => {
  setSearchInput(e.target.value);
};
const handleChangeSelect = (e) => {
  setSelectInput(e.target.value);
};

useEffect(() => {
  const result = items.filter(
    (item) =>
      (!searchInput ||
        item.name.common.toLowerCase().includes(searchInput.toLowerCase())) &&
      (!selectInput || item.region === selectInput)
  );
  setFilteredItems(result);
  console.log(result);
}, [searchInput, items, selectInput]);

```

```
<input type="text" placeholder="Search for a country" disabled={isLoaded ? false : true} value={searchInput} onChange={handleChangeInput} />

<select className="form__select" onChange={handleChangeSelect}>
  <option value="">All</option>
  {regionList.map((region) => (
    <option value={region} key={region}>
      {region}
    </option>
  ))}
</select>

```

- Handle theme with `localStorage`.

```
const [isActive, setActive] = useState("false");
localStorage.getItem('theme');

const handleToggle = () => {
  setActive(!isActive);
  if (isActive === true) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}
```

```
<div className={localStorage.getItem("theme") === "light" ? "App light-theme" : "App dark-theme"}>
  <Navbar onClick={handleToggle} />
  <Routes />
</div>
```

For theme style, I use SCSS nesting. If `App` have class `light-theme` then, children item such as `card`, `input`, and skeleton loading will have light background color and dark font, and if `App` have class `dark-theme` then, children item will have dark background and light font.

- Make skeleton loading.
  For example I'm going to use card component.

```
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  getData();
}, [])

const getData = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(
    (results) => {
      // When results is loaded, we set isLoaded to true
      setIsLoaded(true);
      setItems(results);
      // console.log(results)
    }
  )
}
```

For the HTML, if isLoaded is false then add class `skeleton` to `form__search` and disabled input.

```
<div className={isLoaded ? 'form__search' : 'form__search skeleton' }>
  <ion-icon name="search"></ion-icon>
  <input type="text" placeholder="Search for a country" disabled={isLoaded ? false : true} value={searchInput} onChange={handleChangeInput} />
</div>
```

For styling I use SCSS nesting.

```
// variable
//color for dark theme
$dark-background: #202c37;
$dark-element: #2b3945;
$dark-text: #ffffff;

//color for light theme
$light-background: #fafafa;
$light-element: #ffffff;
$light-text: #111517;

//mixin
@mixin skeleton {
  content: "" !important;
  width: 50px;
  position: absolute;
  height: 100%;
  animation-name: gradient-animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  filter: blur(5px);
}

@mixin skeleton-dark {
  background: $dark-element !important;

  &::after {
    background: linear-gradient(
      to right,
      $dark-element 25%,
      $dark-background 50%,
      $dark-element 100%
    );
  }
}

@mixin skeleton-light {
  background-color: #e2e2e2;

  &::after {
    background: linear-gradient(
      to right,
      #e2e2e2 25%,
      #d5d5d5 50%,
      #e2e2e2 100%
    );
  }
}
```

```
// input base

.form {
  &__search {
    display: flex;
    align-items: center;
    width: 480px;
    padding: 0 32px;
    border-radius: 8px;

    ion-icon {
      font-size: 18px;
      margin-right: 24px;
    }
    input {
      border: none;
      outline: none;
      padding: 18px 0;
      width: 100%;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: -0.01em;
      background-color: transparent;
    }
  }
  &__search.skeleton {
    color: transparent;
    position: relative;
    overflow: hidden;
    border-radius: 0;

    ion-icon {
      color: transparent !important;
    }
    input {
      color: transparent !important;

      &::placeholder {
        color: transparent !important;
      }
    }
    &::after {
      @include skeleton;
      margin: 0 -32px;
    }
  }
}

@keyframes gradient-animation {
  from {
    left: 0%;
  }
  to {
    left: 100%;
  }
}
```

```
// dark theme

.dark-theme {
  .form {
    &__search {
      background: $dark-element;

      ion-icon {
        color: $dark-text;
      }
      input {
        color: $dark-text;

        &::placeholder {
          color: $dark-text;
        }
      }
    }
    &__search.skeleton {
      @include skeleton-dark;
    }
  }
}
```

```
// light theme

.light-theme {
  .form {
    &__search {
      background: $light-element;

      ion-icon {
        color: $light-text;
      }
      input {
        color: $light-text;

        &::placeholder {
          color: hsl(0, 0%, 52%);
        }
      }
    }
    &__search.skeleton {
      @include skeleton-light;
    }
  }
}
```

## Author

- Frontend Mentor: [@NabillaTrisnani](https://www.frontendmentor.io/profile/NabillaTrisnani)
- Github: [@NabillaTrisnani](https://github.com/NabillaTrisnani)
- LinkendIn: [Nabilla Trisnani](https://www.linkedin.com/in/nabilla-trisnani/)
- Twitter: [@NabillaTrisnani](https://twitter.com/NabillaTrisnani)
