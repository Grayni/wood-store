<template lang="pug">
  .products-list
    h2.admin-title Products List
</template>

<script>
  export default {
    name: 'products-page',
    middleware: ['admin-auth'],
    layout: 'admin'
  }
</script>

<style lang="stylus">
</style>
