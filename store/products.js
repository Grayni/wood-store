export const state = () => ({
  product: {
    title: 'test',
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

export const mutations = {
  changeTitle: (state, title) => state.product.title = title,
  changeIdentifier: (state, identifier) => state.product.identifier = identifier
}

export const getters = {
  product: state => state.product
}