<template lang="pug">
  .wrap-time
    span  {{ date | date('dateRegistration') }}
</template>

<script>
export default {
  props: {
    date: String
  }
}
</script>

<style lang="stylus" scoped>
</style>
