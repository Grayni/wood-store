<template lang="pug">
  .redact-create
    el-page-header.header-page(@back="$router.push('/admin/types')" :content="this.meta.title" :title="'Таблица типов'.toUpperCase()")
</template>

<script>
  export default {
    name: 'type-create-page',
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
          title: 'Создать тип',
          description: 'Создание типа товара с уже определенным набором характеристик.'
        }
      }
    },
  }
</script>

<style lang="stylus">
</style>
