import http from 'src/utils/http'

const URL = 'products'

export const productApi = {
  getProducts(config) {
    return http.get(URL, config)
  },
  getProductDetail(id) {
    http.get(`${URL}/${id}`)
  }
}

export default productApi
