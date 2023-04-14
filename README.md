<a name="readme-top"></a>

[![https://www.linkedin.com/in/prokoptsovd/][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  ![Logo1](https://raw.githubusercontent.com/ProkoptsovD/clicker-heroes-game/assets/images/logo.png)
  ![Logo2](https://raw.githubusercontent.com/ProkoptsovD/clicker-heroes-game/assets/images/edition.png)

  <p align="center">
    Dead simple clicking game with good story and appealing design
    <br />
    <br />
    <a href="https://prokoptsovd.github.io/clicker-heroes-game/">View demo</a>
    ·
    <a href="https://t.me/dima_prokoptsov">Report Bug</a>
    ·
    <a href="https://t.me/dima_prokoptsov">Offer job</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a game that will tell the story of a city in which a big crime happened. You will fight a gang of dangerous criminals and become the hero of the city. Or will you not? It all depends on you. An exciting plot, vivid characters and beautiful scenes await you in the game. Ready to burn the hell out of your mouse :smile:? Left button hold on!

Main features:

- tracking total score even on refresh;
- ability to reset score;
- ability to skip dialogues;
- ability to give main hero a name;
- different enemies with different locations assets.

<p align="right"><a href="#readme-top">back to top</a></p>

### Built With

No frameworks, no libs, no bundlers, no preprocessors. The project is built using only:

- [![js]][js-url]
- [![css]][css-url]
- [![html]][html-url]

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- GETTING STARTED -->

## Getting Started

There are several ways to run this project locally. But let's proceed to certains steps

### Prerequisites

For run this propject you will need:

- Node.js

### Installation

_Fist of all you need to download this repo to your computer. The best variant to do that is clone the repo via terminal._

Just open terminal, navigate to folder you want to keep this repo and run command:

```sh
git clone https://github.com/ProkoptsovD/clicker-heroes-game.git
```

Once it's done, open the folder with project in your IDE (like VS Code) and find file `config.js`:

```
/constants/config.js
```

then change BASE_URL to empty string like so:

```
export const BASE_URL = '';
```

also several pathes in `index.html` file. Open that file and find line `7`, `8`, `86`:

- line 7

```
<link href="/clicker-heroes-game/index.css" rel="stylesheet"></link>
```

- line 8

```
<link rel="icon" type="image/x-icon" href="/clicker-heroes-game/assets/icons/favicon.svg">
```

- line 86

```
<script defer src="/clicker-heroes-game/index.js" type="module"></script>
```

At those lines you need to remove part `/clicker-heroes-game` that is root path for deployed version. Without that the project will download resources from the wrong path. As a result there is no any images and whole project will be broken, 'cause there is no js script file.

After that run command in terminal:

```js
npm start
```

It will run custom node server, serving files. Open the url in browser - and that's it

OR

Open the folder in your IDE (like VS Code). Install extention for serving files:

```sh
Live Server by Ritwick Dey
```

And folowing the instructions run the project.

<p align="right"><a href="#readme-top">back to top</a></p>

## Contact

Dmytro Prokoptsov: <p align="center">[![gmail]][gmail-url] [![tg]][tg-url]</p>

<p align="right"><a href="#readme-top">back to top</a></p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/prokoptsovd/
[js]: https://img.shields.io/badge/-JavaScript-000000?logo=javascript&style=for-the-badge
[js-url]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
[css]: https://img.shields.io/badge/-CSS-2965f1?logo=css3&style=for-the-badge
[css-url]: https://www.w3.org/Style/CSS/specs.en.html
[html]: https://img.shields.io/badge/-HTML-545454?logo=html5&style=for-the-badge
[html-url]: https://html.spec.whatwg.org/

<!-- icons -->

[gmail]: https://img.shields.io/badge/-gmail-ffffff?logo=gmail
[gmail-url]: mailto:fenderman1992@gmail.com
[tg]: https://img.shields.io/badge/-telegram-ffffff?logo=telegram
[tg-url]: https://t.me/dima_prokoptsov

```

```
