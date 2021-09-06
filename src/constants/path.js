export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  user: '/user',
  product: '/product',
  productdetail: '/product/:idProduct',
  purchase: '/user/purchase',
  get profile() {
    return this.user + '/profile'
  },
  get password() {
    return this.user + '/password'
  },
  // get purchase() {
  //   return this.user + '/purchase'
  // },

  notfound: '*',
  cart: '/cart'
}
