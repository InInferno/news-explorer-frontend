export default class NewsCard {
  constructor(api) {
    this.api = api;
  }

  createCard(articleData) {
    const template = document.createElement("div");
    template.insertAdjacentHTML('beforeend', `
      <div class="article">
        <div class="article__icon"></div>
        <div class="article__icon_active"></div>
        <p class="article__info-icon">Войдите, чтобы сохранять статьи</p>
        <p class="article__delete-icon">Убрать из сохранённых</p>
        <p class="article__tag-icon">${articleData.keyword}</p>
        <a href="${articleData.link}" class="article__link">
          <div class="article__image" style="background-image: url('${articleData.image}')"></div>
          <p class="article__date">${articleData.date}</p>
          <h3 class="article__title">${articleData.title}</h3>
          <p class="article__text"></p>
          <p class="article__source">${articleData.source}</p>
        </a>
      </div>`
      );

    const articleText = template.querySelector('.article__text');
    if (articleData.text === null) {
      articleText.textContent = '';
    } else {
      articleText.textContent = articleData.text;
    }

    this.renderIcon(articleData, template);

    return template;
  }

  renderIcon(articleData, template) {

    const articleIcon = template.querySelector('.article__icon');
    const articleIconActive = template.querySelector('.article__icon_active');
    const articleIconDelete = template.querySelector('.article__delete-icon');
    const tagArticleInfo = template.querySelector('.article__tag-icon');
    const articleInfoIcon = template.querySelector('.article__info-icon');

    if (localStorage.isLoggedIn === 'false' && localStorage.color === 'black') {
      articleIcon.onmouseover = function(){articleInfoIcon.style.display='flex'};
      articleIcon.onmouseout = function(){articleInfoIcon.style.display='none'};
    }

    if (localStorage.isLoggedIn === 'true' && localStorage.color === 'white') {
      articleIcon.classList.add('article__icon-trash');
      articleIcon.onmouseover = function(){articleIconDelete.style.display='flex'};
      articleIcon.onmouseout = function(){articleIconDelete.style.display='none'};
      tagArticleInfo.classList.add('article__tag-icon_active');

      articleIcon.addEventListener('click', () => {
        const areYouSure = confirm('Вы уверены, что хотите удалить данную статью?')
        if (areYouSure) {
          this.api.removeArticle(articleData)
            .then(res => res.json())
            .then(res => {
              console.log(articleData);
              console.log(res, 'Карточка удалена');
              articleIcon.parentNode.parentNode.removeChild(articleIcon.parentNode);
            })
        }
      })
    }

    if (localStorage.isLoggedIn === 'true' && localStorage.color === 'black') {

      this.api.getArticles()
      .then(res => res.json())
      .then((resArticles) => {
        const resArticlesData = resArticles.data;
        let articlesLinks = [];

        resArticlesData.forEach((article) => {
          articlesLinks.push(article.link);
        });

        if (articlesLinks.indexOf(articleData.link) !== -1) {
          articleIcon.style.display='none';
          articleIconActive.style.display='flex';
        }
      })

      articleIcon.addEventListener('click', () => {
        this.api.createArticle(articleData)
          .then(res => res.json())
          .then(res => {
            console.log(res, 'Карточка добавлена');
            articleIcon.style.display='none';
            articleIconActive.style.display='flex';
          })
      })

      articleIconActive.addEventListener('click', () => {
        this.api.getArticles()
        .then(res => res.json())
        .then((resArticles) => {
          const resArticlesData = resArticles.data;
          let articlesLinks = [];
          let indexArticle;

          resArticlesData.forEach((article) => {
            articlesLinks.push(article.link);
          });
          indexArticle = articlesLinks.indexOf(articleData.link);

          this.api.removeArticle(resArticlesData[indexArticle])
          .then(res => res.json())
          .then(res => {
            console.log(res, 'Карточка удалена');
            articleIcon.style.display='flex';
            articleIconActive.style.display='none';
          })
        })
      })

    }
  }

}