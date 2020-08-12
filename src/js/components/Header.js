export default class Header {
  constructor() {

  }

  render() {
    const template = document.createElement("div");
    if (localStorage.color === 'black') {
    template.insertAdjacentHTML('beforeend', `
      <div class="header__container">
      <p class="header__logo">NewsExplorer</p>
      <nav class="header__navigation">
        <a class="header__nav-link header__nav-link_active" href="index.html">Главная</a>
        <a class="header__nav-link header__saved-articles" href="articles.html">Сохранённые статьи</a>
        <button class="header__nav-link header__button header__authorization">Авторизоваться</button>
        <button class="header__button header__user">${localStorage.userName} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z" fill="white"/>
        </svg></button>
      </nav>
      <svg class="header__menu header__menu_active" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="16" height="2" fill="white"/>
      <rect x="4" y="14" width="16" height="2" fill="white"/>
      </svg>
      </div>
    `);
  } else if (localStorage.color === 'white') {
    template.insertAdjacentHTML('beforeend', `
    <div class="header__container">
    <p class="header__logo header__logo_logged">NewsExplorer</p>
    <nav class="header__navigation">
    <a class="header__nav-link header__nav-link_logged" href="./index.html">Главная</a>
    <a class="header__nav-link header__nav-link_logged header__nav-link_active_logged" href="./articles.html">Сохранённые статьи</a>
      <button class="header__nav-link header__button header__authorization">Авторизоваться</button>
      <button class="header__button header__user header__button_logged">${localStorage.userName} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6L6 6L6 18H10V20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H10V6ZM17.5856 13L13.2927 17.1339L14.707 18.4958L21.4141 12.0371L14.707 5.57837L13.2927 6.9402L17.5856 11.0741H8V13H17.5856Z" fill="#1A1B22"/>
      </svg></button>
    </nav>
    <svg class="header__menu header__menu_active header__menu_logged" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="2" fill="#1A1B22"/>
    <rect x="4" y="14" width="16" height="2" fill="#1A1B22"/>
    </svg>
    </div>
  `);
  }

    const header = document.querySelector('.header');
    const headerSavedArticles = template.querySelector('.header__saved-articles');
    const headerAuthorization = template.querySelector('.header__authorization');
    const headerUser = template.querySelector('.header__user');

    const headerAuthorizationMobile = document.querySelector('.header__authorization-mobile');
    const headerUserMobile = document.querySelector('.header__user-mobile');
    const savedArticlesMobile = document.querySelector('.mobile-menu__saved-articles');

    header.classList.add(`header_${localStorage.color}`);

    headerUserMobile.insertAdjacentHTML('afterBegin',`${localStorage.userName}`);


    if (localStorage.isLoggedIn === 'true') {
      headerAuthorization.classList.add('header__link-hide');
      headerAuthorizationMobile.classList.add('header__link-hide');
      savedArticlesMobile.classList.remove('mobile-menu__link_hide');
    } else {
      headerSavedArticles.classList.add('header__link-hide');
      headerUser.classList.add('header__link-hide');
      headerUserMobile.classList.add('mobile-menu__button_hide');
      savedArticlesMobile.classList.add('mobile-menu__link_hide');
    };

    header.innerHTML = template.innerHTML;
  };
};
