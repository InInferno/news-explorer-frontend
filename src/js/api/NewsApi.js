export default class NewsApi {
  constructor(config) {
    this.newsApiUrl = config.newsApiUrl;
    this.newsApiUrlDate = config.newsApiUrlDate;
    this.newsApiUrlSortBy = config.newsApiUrlSortBy;
    this.newsApiUrlKey = config.newsApiUrlKey;

  }

  getNews(keyWord) {
    return fetch(`${this.newsApiUrl}` +
    `q=${keyWord}&` +
    `${this.newsApiUrlDate}` +
    `${this.newsApiUrlSortBy}` +
    `${this.newsApiUrlKey}`)
  }

}