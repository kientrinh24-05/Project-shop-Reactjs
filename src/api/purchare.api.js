import { statusCart } from 'src/constants/status'
import http from 'src/utils/http'

const URL = 'purchases'
const purchaseApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  getCartPurchase() {
    return http.get(URL, {
      params: {
        status: statusCart.inCart
      }
    })
  },
  getPurchare(status) {
    return http.get(URL, {
      params: {
        status
      }
    })
  },
  updatePurchase(data) {
    return http.put(`${URL}/update-purchase`, data)
  },
  deletePurchase(data) {
    return http.delete(`${URL}`, data)
  },
  buyPurchase(data) {
    return http.post(`${URL}/buy-products`, data)
  }
}
export default purchaseApi
