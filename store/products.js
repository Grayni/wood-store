import availability from '@/storage/availability'

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
console.log()
const productInit = JSON.parse(JSON.stringify(state().product))

export const mutations = {
  changeTitle: (state, title) => state.product.title = title,
  changeIdentifier: (state, identifier) => state.product.identifier = identifier,
  changeCategory: (state, category) => state.product.category = category,
  changeRate: (state, rate) => state.product.rate = rate,
  changeDescription: (state, description) => state.product.description = description,
  changePrice: (state, price) => state.product.price = price,
  changeSale: (state, sale) => state.product.sale = sale,
  changeAmount: (state, amount) => state.product.amount = amount,
  changeAvailability: (state, value) => state.product.availability = availability.filter(x => x.value === value)[0],
  changeDisplay: (state, value) => console.log(value)
}

export const getters = {
  product: state => state.product,
  category: state => state.product.category,
  availabilityValue: state => state.product.availability.value
}