<template lang="pug">
  .char-options
    h2.decorate Свойства характеристики:
    transition-group(name="list" tag="div" :class="'list-values'")
      div.tag(v-for="(value, i) in characteristic.values" :key="value")
        el-tag(:type="backupChar.values.includes(characteristic.values[i]) ? '' : 'success'")
          span {{value}}
          el-button.times(type="text" @click="addNotifyDelete(i, value, characteristic.values)") &times;

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'char-options',
    data() {
      return {
        lengthInitialValues: 0
      }
    },
    computed: {
      ...mapGetters('characteristics', ['characteristic', 'backupChar'])
    },
    methods: {
      ...mapActions('characteristics', ['deleteValue', 'returnOriginal']),

      async addNotifyDelete(index, value) {
        const formData = {
          index, value, identifier: this.$route.params.identifier
        }

        console.log(formData)

        const message = await this.deleteValue(formData)

        this.$notify({type: 'info', message})
      }

    },
    beforeUpdate() {
      this.backupChar
    },
    beforeDestroy() {
      this.returnOriginal()
    }
  }
</script>

<style lang="stylus">
  .char-options
    border-right 1px solid #DCDFE6
    padding-left 20px
    .list
      &-values
        display flex
        flex-direction column
      &-value
        display block
        position relative
        top -10px
        span
          font-size 14px
        span:first-letter
            text-transform uppercase
    .times
      padding 0
      span
        font-size 25px
        margin 0 0 0 3px
        top 5px
        padding 0
        position relative

    .list-enter-active, .list-leave-active
      max-height 20px
      transition all .4s
    .list-enter, .list-leave-to
      opacity 0
      max-height 0px
      transform translateX(30px)
      transition all .4s

    .list-values
      display flex
      flex-wrap wrap
      .tag
        margin-bottom 5px
</style>
