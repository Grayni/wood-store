<template lang="pug">
  .sales
    h2.admin-title Sales
</template>

<script>
  export default {
    name: 'sales-page',
    middleware: ['admin-auth'],
    layout: 'admin'
  }
</script>

<style lang="stylus">
</style>
