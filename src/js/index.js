import "../pages/index.css";
import "../vendor/normalize.css"

import {config} from './utils/config';
import Header from './components/Header';
import Popup from './components/Popup';
import Form from './components/Form';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import MainApi from './api/MainApi';
import NewsApi from './api/NewsApi';

localStorage.color = 'black';

const popupAuth = document.querySelector('.popup-signin');
const popupReg = document.querySelector('.popup-signup');
const popupRegSuccess = document.querySelector('.popup-add');
const registrationForm = document.querySelector('.popup__registration-form');
const joinForm = document.querySelector('.popup__join-form');
const popupMobMenu = document.querySelector('.popup_mobile-menu');
const closeButtonMenu = document.querySelector('.mobile-menu__close');
const buttonReg = document.getElementById('buttonReg');
const buttonMenuLogout = document.querySelector('.mobile-menu__button');
const buttonJoin = document.getElementById('buttonJoin');
const searchInput = document.querySelector('.search-field__input');
const searchButton = document.querySelector('.search-field__button');
const showMoreButton = document.querySelector('.news__button');
const authMenuButton = document.querySelector('.header__authorization-mobile');

const renderHeader = new Header();
const mainApi = new MainApi(JSON.parse(config));
const newsApi = new NewsApi(JSON.parse(config));
const newsCard = new NewsCard(mainApi);
const newsCardList = new NewsCardList();
const popupAuthoriz = new Popup(popupAuth);
const popupRegis = new Popup(popupReg);
const popupRegisSuccess = new Popup(popupRegSuccess);
const formReg = new Form(registrationForm);
const formJoin = new Form(joinForm);

renderHeader.render();
const buttonLogout = document.querySelector('.header__user');
const authHeaderButton = document.querySelector('.header__button');
const headerMenu = document.querySelector('.header__menu');



function signup() {
  const formInfo = formReg.formInfo;
  mainApi.signup(formInfo)
    .then(res => res.json())
    .then((result) => {
      if (result.message) {
        formReg.setServerError(result.message);
        throw new Error(`${result.message}`);
      }
      console.log(result, '123')
      setContentRegSuccess();
    })
    .catch((err) => {
      console.log(err);
    })
}

function signin() {
  const formInfo = formJoin.formInfo;
  mainApi.signin(formInfo)
    .then(res => res.json())
    .then((result) => {
      if (result.message) {
        formJoin.setServerError(result.message);
        throw new Error(`${result.message}`);
      } else {
      localStorage.token = result.token;
      localStorage.isLoggedIn = true;

      mainApi.getUserData()
      .then(res => res.json())
      .then((userData) => {
        console.log(userData.data.name);
        localStorage.userName = userData.data.name;
      })
      .catch((err) => {
        console.log(err);
      })

      renderHeader.render();
      popupAuthoriz.clearContent();
      popupAuthoriz.close();
      const buttonLogout = document.querySelector('.header__user');
      buttonLogout.addEventListener('click', () => logout());
      const headerMenu = document.querySelector('.header__menu');
      headerMenu.addEventListener('click', openMobileMenu);
      const mobileMenuButton = document.querySelector('.mobile-menu__button')
      mobileMenuButton.classList.remove('mobile-menu__button_hide');
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function getNewsFromApi() {
  const newsSection = document.querySelector('.news');
  newsSection.classList.remove('news_active');
  const noResult = document.querySelector('.no-result');
  noResult.classList.remove('no-result_active');
  showMoreButton.classList.add('news__button_active');
  newsCardList.renderLoader();
  newsCardList.placeList.innerHTML = '';
  newsApi.getNews(`${searchInput.value}`)
  .then(res => res.json())
  .then(res => {
    if (res.totalResults === 0) {
      newsCardList.renderError();
      throw new Error('Ничего не найдено');
    } else {

      const { articles } = res;
      const articlesData = [];
      articles.forEach((article) => {
        const articleData = {};
        articleData.keyword = searchInput.value;
        articleData.title = article.title;
        if (article.description === null) {
          articleData.text = article.title;
        } else {
          articleData.text = article.description;
        }
        articleData.date = article.publishedAt;
        articleData.source = article.source.name;
        articleData.link = article.url;
        articleData.image = article.urlToImage;
        articlesData.push(newsCard.createCard(articleData));
      });

      newsSection.classList.add('news_active');
      newsCardList.getArticles(articlesData);
      return articlesData;
    }
  })
  .then(articlesData => {
    for (let i = 0; i <= 2; i++) {
      newsCardList.addCard(articlesData[i]);
    }
  })
  .catch(error => {
    console.log(error);
  })
  .finally((res) => {
    newsCardList.renderLoader();
  })
}

function setContentSignIn() {
  popupAuthoriz.clearContent();
  popupAuthoriz.setContent();
  popupAuthoriz.open();
  const closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    headerMenu.classList.add('header__menu_active');
    closePopup();
  });
  const registrationButton = document.querySelector('.popup__form-registration');
  registrationButton.addEventListener('click', setContentSignUp);
}

function setContentSignUp() {
  popupRegis.clearContent();
  popupRegis.setContent();
  popupRegis.open();
  const closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    headerMenu.classList.add('header__menu_active');
    closePopup();
  });
  const authorizationButton = document.querySelector('.popup__form-join-button');
  authorizationButton.addEventListener('click', setContentSignIn);
}

function setContentRegSuccess() {
  popupRegisSuccess.clearContent();
  popupRegisSuccess.setContent();
  popupRegisSuccess.open();
  const closeButton = document.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    headerMenu.classList.add('header__menu_active');
    closePopup();
  });
  const authorizationButton = document.querySelector('.popup__form-join-button');
  authorizationButton.addEventListener('click', setContentSignIn);
}

function closePopup() {
  popupAuthoriz.clearContent();
  popupAuthoriz.close();
}

function logout() {
  localStorage.token = '';
  localStorage.isLoggedIn = false;
  location.reload();
}

function openMobileMenu() {
  popupMobMenu.classList.add('popup_is-opened');
}

function getMoreNewsFromApi() {
  newsCardList.showMore();
}

searchButton.addEventListener('click', () => getNewsFromApi());
showMoreButton.addEventListener('click', () => getMoreNewsFromApi());
buttonLogout.addEventListener('click', () => logout());
authHeaderButton.addEventListener('click', setContentSignIn);
buttonReg.addEventListener('click', () => signup());
buttonMenuLogout.addEventListener('click', () => logout());
buttonJoin.addEventListener('click', () => signin());
closeButtonMenu.addEventListener('click', () => {
  popupMobMenu.classList.remove('popup_is-opened');
});
headerMenu.addEventListener('click', openMobileMenu);
authMenuButton.addEventListener('click', () => {
  headerMenu.classList.remove('header__menu_active');
  popupMobMenu.classList.remove('popup_is-opened');
  setContentSignIn();
});
