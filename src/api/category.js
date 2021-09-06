import http from 'src/utils/http'
const URL = 'categories'
const CategoriesApi = {
  getCategories() {
    return http.get(URL)
  }
}
export default CategoriesApi
