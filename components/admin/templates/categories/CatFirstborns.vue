<template lang="pug">
  el-select(:value="firstborn.value" @input="defineFirstborn" placeholder="Выбор категории или нулевого уровня")
    el-option(v-for="item in firstborns" :key="item.value" :label="item.label" :value="item.value")
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'cat-firstborns',
    computed: {
      ...mapGetters('categories', ['firstborns', 'firstborn'])
    },
    methods: {
      ...mapActions('categories', ['fetchListParentsNames']),
      ...mapMutations('categories', ['defineFirstborn'])
    },
    created() {
      this.fetchListParentsNames()
    }
  }
</script>

<style lang="stylus">
</style>
