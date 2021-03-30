<template lang="pug">
  .testing-wrap
    h1 Тестирование и создание компонентов
    br
    br
    el-button(type="warning" native-type="submit" @click="")
      span.text-button RUN
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'testing-page',
    layout: 'admin',
    middleware: ['admin-auth']

  }
</script>

<style lang="stylus">
</style>
