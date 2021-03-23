<template lang="pug">
  .orders
    h2.admin-title Orders
</template>

<script>
  export default {
    name: 'orders-page',
    middleware: ['admin-auth'],
    layout: 'admin'
  }
</script>

<style lang="stylus">
</style>
