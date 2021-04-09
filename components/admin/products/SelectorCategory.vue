<template lang="pug">
  el-select(:value="category" @change="changeCategory" placeholder="Выбор категории")
    el-option-group(
      v-for="group in subcategoriesList"
      :key="group.label"
      :label="group.label"
    )
      el-option(
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      )
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    name: 'selector-category',
    computed: {
      ...mapGetters('categories', ['subcategoriesList']),
      ...mapGetters('products', ['category'])
    },
    methods: {
      ...mapActions('categories', ['fetchSubcategoriesList']),
      ...mapMutations('products', ['changeCategory'])
    },
    async created() {
      this.fetchSubcategoriesList()
    }
  }
</script>

<style lang="stylus">
</style>
