<template lang="pug">
  el-select(:value="category.parent.value" @input="defineParentParams" placeholder="Выбор категории или нулевого уровня")
    el-option(v-for="item in firstborns" :key="item.value" :label="item.label" :value="item.value")
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'cat-firstborns',
    computed: {
      ...mapGetters('categories', ['firstborns', 'category'])
    },
    methods: {
      ...mapActions('categories', ['fetchListParentsNames']),
      ...mapMutations('categories', ['defineParent']),

      defineParentParams(event) {
        const parent = this.firstborns.find(x => x.value === event)
        return this.defineParent(parent)
      }
    },
    async created() {
      await this.fetchListParentsNames()
    }
  }
</script>

<style lang="stylus">
</style>
