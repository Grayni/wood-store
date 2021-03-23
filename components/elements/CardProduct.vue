<template lang="pug">
  el-card.card-product(shadow="always")
    img(src="/catalog/chair.jpg" width="240" height="240")

    div
      div.name-product
        span Стул
        h4 Delicate Vine
      span Цена
      div.cost
        span 20000
        span.rub
      button Купить
</template>

<script>
  export default {
    name: "CardProduct"
  }
</script>

<style lang="stylus">
  .card-product
    max-width 300px
    text-align center
    justify-content center
</style>
