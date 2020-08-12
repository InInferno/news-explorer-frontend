import "../pages/articles.css";
import "../vendor/normalize.css";

import {config} from './utils/config';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import MainApi from './api/MainApi';

localStorage.color = 'white';

const renderHeader = new Header();
const mainApi = new MainApi(JSON.parse(config));
const newsCard = new NewsCard(mainApi);
const newsCardList = new NewsCardList();


renderHeader.render();
const buttonLogout = document.querySelector('.header__user');
const popupMobMenu = document.querySelector('.popup_mobile-menu');
const closeButtonMenu = document.querySelector('.mobile-menu__close');
const headerMenu = document.querySelector('.header__menu');
const authMenuButton = document.querySelector('.header__authorization-mobile');
const buttonMenuLogout = document.querySelector('.mobile-menu__button');



function renderArticles() {
  mainApi.getArticles()
    .then(res => res.json())
    .then((result) => {
     const newsSection = document.querySelector('.news');
     newsSection.classList.remove('news_active');
      let articlesData = result.data;
      let articles = [];
      articlesData.forEach((article) => {
        articles.push(newsCard.createCard(article));
      });
      newsSection.classList.add('news_active');
      newsCardList.renderResults(articles);
    })
    .catch((error) => {
      console.log(error);
    })
};

function renderUserArticlesInfo() {
  mainApi.getArticles()
    .then(res => res.json())
    .then((resArticles) => {
     const userArticleText = document.querySelector('.user-articles-info__text');
     const tagArticleOne = document.querySelector('.user-articles-info__text_one');
     const tagArticleTwo = document.querySelector('.user-articles-info__text_two');
     const tagArticleOther = document.querySelector('.user-articles-info__text_other');

     const articles = resArticles.data;
      let keywords = [];
      articles.forEach((article) => {
        keywords.push(article.keyword);
      })
      const uniqueKeywords = [...new Set(keywords)];

      tagArticleOne.textContent = `${uniqueKeywords[0]}, `;
      tagArticleTwo.textContent = uniqueKeywords[1];

      if (uniqueKeywords.length === 0) {
        tagArticleOne.textContent = `${uniqueKeywords[0]}`;
        userArticleText.textContent = ``;
      } else if (uniqueKeywords.length === 1) {
        tagArticleOne.textContent = `${uniqueKeywords[0]}`;
        userArticleText.textContent = `По ключевому слову: ${tagArticleOne.textContent + tagArticleTwo.textContent}`;
      }
      else if (uniqueKeywords.length === 2) {
        userArticleText.textContent = `По ключеным словам: ${tagArticleOne.textContent + tagArticleTwo.textContent}`;
      } else if (uniqueKeywords.length === 3) {
        userArticleText.textContent = `По ключеным словам: ${tagArticleOne.textContent + tagArticleTwo.textContent} и 1 другому`;
      } else {
        tagArticleOther.textContent = ` и ${uniqueKeywords.length - 2} другим`;
      }

      mainApi.getUserData()
      .then(res => res.json())
      .then((result) => {
        const userData = result.data;
        const userInfo = document.querySelector('.user-articles-info__subtitle');
        if (articles.length === 0) {
          userInfo.textContent = `${userData.name}, у вас нет сохранённых статей`
        }
        else if (articles.length === 1) {
          userInfo.textContent = `${userData.name}, у вас ${articles.length} сохранённая статья`
        } else if (articles.length > 1 && articles.length <= 4) {
          userInfo.textContent = `${userData.name}, у вас ${articles.length} сохранённых статьи`
        } else {
          userInfo.textContent = `${userData.name}, у вас ${articles.length} сохранённых статей`
        }
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      console.log(error);
    })
};

function logout() {
  localStorage.token = '';
  localStorage.isLoggedIn = false;
  location.reload();
}

function openMobileMenu() {
  popupMobMenu.classList.add('popup_is-opened');
}



renderArticles();
renderUserArticlesInfo();


buttonLogout.addEventListener('click', () => {
  logout();
  window.location.href = './index.html';
});
closeButtonMenu.addEventListener('click', () => {
  popupMobMenu.classList.remove('popup_is-opened')
});
headerMenu.addEventListener('click', openMobileMenu);
authMenuButton.addEventListener('click', () => {
  popupMobMenu.classList.remove('popup_is-opened');
  setContentSignIn();
});
buttonMenuLogout.addEventListener('click', () => {
  logout();
  window.location.href = './index.html';
});
