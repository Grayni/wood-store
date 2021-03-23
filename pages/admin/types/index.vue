<template lang="pug">
  .types-page
    h1 Список типов
</template>

<script>
  export default {
    name: 'types-page',
    maddleware: ['admin-auth'],
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
          title: 'Список типов',
          description: 'Таблица существующих типов товаров.'
        }
      }
    },
  }
</script>

<style lang="stylus">
</style>
