// const serverUrl = NODE_ENV === 'development' ? 'http://api.newsexp.ml' : 'https://api.newsexp.ml'
const serverUrl = NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000'
const obj = {
  baseUrl: `${serverUrl}`,
  newsApiUrl: 'http://newsapi.org/v2/everything?',
  newsApiUrlDate: 'from=2020-07-25&',
  newsApiUrlSortBy: 'sortBy=popularity&',
  newsApiUrlKey: 'apiKey=3612e32c0c1947be80826cf89f04f916',
  };

export const config = JSON.stringify(obj);
