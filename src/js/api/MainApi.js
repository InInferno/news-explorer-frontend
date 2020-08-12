export default class MainApi {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.contentType = config.contentType;
  }

  signup(userData) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password
      })
    })
  }


  signin(userData) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    })
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      }
    })
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      }
    })

  }

  createArticle(articleData) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: articleData.keyword,
        title: articleData.title,
        text: articleData.text,
        date: articleData.date,
        source: articleData.source,
        link: articleData.link,
        image: articleData.image,
      })
    })
  }

  removeArticle(articleData) {
    return fetch(`${this.baseUrl}/articles/${articleData._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
    })
  }
}