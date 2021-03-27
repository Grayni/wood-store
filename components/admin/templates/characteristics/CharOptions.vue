<template lang="pug">
  .char-options.col-2
    h2.decorate Свойства характеристики:
    transition-group(name="list" tag="div" :class="'list-values'")
      .tags-wrap(v-for="(value, i) in characteristic.values" :key="value+1")
        el-tag(:type="backupChar.values.includes(characteristic.values[i]) ? '' : 'success'")
          span.tag-name {{value}}
          el-button.times(type="text" @click="addNotifyDelete(i, value, characteristic.values)") &times;

</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'char-options',
    computed: {
      ...mapGetters('characteristics', ['characteristic', 'backupChar'])
    },
    methods: {
      ...mapActions('characteristics', ['deleteValue']),
      ...mapMutations('characteristics', ['clearChar']),

      async addNotifyDelete(index, value) {
        const formData = {
          index,
          value,
          identifier: this.$route.params.identifier
        }

        const message = await this.deleteValue(formData)

        this.$notify({type: 'info', message})
      }

    },
    beforeDestroy() {
      this.clearChar()
    }
  }
</script>

<style lang="stylus">
  .char-options
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
        font-size 26px
        padding 0
        margin-left 3px
        position relative
        top 4px
        color white
        text-shadow 0 0 2px #0a7efc
        transition all .2s ease
        &:hover
          color #0a7efc
          text-shadow none
          transition all .2s ease
    .tag-name
      position relative
      top -2px
      font-size 14px
    .list-values
      display flex
      flex-wrap wrap
      .tags-wrap
        margin-bottom 5px

    .list-enter-active, .list-leave-active
      max-height 20px
      transition all .4s
    .list-enter, .list-leave-to
      opacity 0
      max-height 0px
      transform translateX(30px)
      transition all .4s
</style>
