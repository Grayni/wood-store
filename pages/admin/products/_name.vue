<template lang="pug">
  .redact-create
    el-page-header.header-page(@back="$router.push('/admin/products')" :content="this.meta.title" :title="'Таблица продуктов'.toUpperCase()")
    el-card.product-page
      img(src="/catalog/chair.jpg" width="200" height="200")

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
    name: "catalog-product-page",
    middleware: ['admin-auth'],
    layout: 'admin',
    head() {
      return {
        title: this.meta.title,
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: this.meta.description
          }
        ]
      }
    },
    data() {
      return {
        meta: {
          title: 'Редактировать пользователя',
          description: 'Страница для настройки параметров пользователя'
        },
      }
    }
  }
</script>

<style lang="stylus">
  .rub:after
    content '\20bd'
  .name-product
    text-align center

</style>
