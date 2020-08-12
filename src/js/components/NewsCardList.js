export default class NewsCardList {
  constructor(articles) {
    this.placeList = document.querySelector('.news__articles');
    this.showMoreButton = document.querySelector('.news__button');
    this.articles = articles;
    this.counterArticlesFrom = 2;
    this.counterArticlesTo = 5;
    this.counterArticlesRemainder = 0;
  }

  getArticles(articles) {
    this.articles = articles;
    this.counterArticlesRemainder = articles.length - 2;
    this.counterArticlesFrom = 2;
    this.counterArticlesTo = 5;
  }

  renderResults(articles) {
    articles.forEach(article => {
      this.addCard(article);
    });
  }

  renderLoader() {
    const loader = document.querySelector('.search-load');
    loader.classList.toggle('search-load_active');
  }

  renderError() {
    const noResult = document.querySelector('.no-result');
    noResult.classList.add('no-result_active');
  }


  showMore() {
    for (let i = this.counterArticlesFrom; i <= this.counterArticlesTo; i++) {
      this.addCard(this.articles[i])
    }

    this.counterFrom += 3;

    if (((this.articles.length - 1) - this.counterArticlesTo) < 3) {
      this.counterArticlesRemainder -= 3;
      this.counterArticlesTo += ((this.articles.length - 1) - this.counterArticlesTo);
    } else {
      this.counterArticlesTo += 3;
      this.counterArticlesRemainder -= 3;
    }

    if (this.counterArticlesRemainder <= 0) {
      this.showMoreButton.classList.remove('news__button_active');
    }
  }

  addCard(article) {
    this.placeList.appendChild(article);
  }
}