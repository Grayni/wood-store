<template lang="pug">
  .date-change
    span Дата последних изменений:
    span {{dateLast}}
</template>

<script>
  export default {
    name: "date-change",
    props: ['date-last']
  }
</script>

<style lang="stylus">

  .date-change
    margin 0 0 40px
    font-size 12px
    color #777
    text-align center
    width 100%
    span
      margin 0 2px
</style>
