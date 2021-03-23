<template lang="pug">
  .testing-wrap
    h1 Тестирование и создание компонентов
    el-form
      characteristics
    block-characteristics
</template>

<script>
  export default {
    name: 'testing-page',
    layout: 'admin',
    middleware: ['admin-auth']
  }
</script>

<style lang="stylus">
</style>
