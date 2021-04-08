export const state = () => ({
  product: {
    title: '',
    identifier: '',
    category: {
      value: '',
      label: ''
    },
    rate: 0,
    description: '',
    price: 0,
    sale: 0,
    amount: 0,
    availability: {
      value: '',
      label: ''
    },
    display: 'Черновик',
    characteristics: [],
    sizeProduct: [],
    sizePackaging: [],
    weight: {
      value: 0,
      unit: ''
    },
    articleNumber: '',
    mainImage: {},
    thumbnails: []
  }
})

const productInit = JSON.parse(JSON.stringify(state().product))

export const mutations = {
  changeTitle: (state, title) => state.product.title = title,
  changeIdentifier: (state, identifier) => state.product.identifier = identifier,
  changeCategory: (state, category) => state.product.category = category,
  changeRate: (state, rate) => state.product.rate = rate
}

export const getters = {
  product: state => state.product,
  category: state => state.product.category,
  rate: state => state.product.rate
}