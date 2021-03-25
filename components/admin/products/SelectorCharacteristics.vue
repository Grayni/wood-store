<template lang="pug">
  .test
    el-select(v-model="select.characteristic" @change="showCharOptions(select.characteristic)" placeholder="Выбор характеристики")
      el-option(
        v-for="characteristic in charsOn"
        :key="characteristic.identifier"
        :label="characteristic.title"
        :value="characteristic.identifier"
      )
    div.show-char-options(v-if="displayChar")
      el-checkbox-group(v-model="charClaster.checkList")
        el-checkbox(v-for="(value, i) in displayChar.values" :key="`value-char-${i}`" :label="value")
      .added-char
        el-tag.tag(v-for="(item, i) in charClaster.checkList" :key="`option-${i}`") {{item}}
      el-button Добавить


</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'selector-characteristics',
    data() {
      return {
        select: {
          characteristic: ''
        },
        charClaster: {
          identifier: '',
          checkList: []
        },
        charsGroup: [],
        displayChar: null
      }
    },
    computed: {
      ...mapGetters('characteristics', ['charsOn'])
    },
    methods: {
      ...mapActions('characteristics', ['fetchCharsAll', 'showCharsOptions']),
      showCharOptions(identifier) {
        this.displayChar = this.charsOn.find(char => char.identifier === identifier)
      }
    },
    async created() {
      await this.fetchCharsAll()
    }
  }
</script>

<style lang="stylus">
</style>
