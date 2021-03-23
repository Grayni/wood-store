<template lang="pug">
  el-form-item
    el-checkbox(v-model="checked")
    label.el-form-item__label(:class="{'active-label': !checked}") {{label}}
    el-input(v-model="value" :disabled="!checked")
</template>

<script>
  export default {
    name: "property-string-constructor",
    props: {
      label: {
        type: String,
        default: 'undefined'
      }
    },
    data() {
      return {
        checked: false,
        value: ''
      }
    },
  }
</script>

<style lang="stylus">
</style>
