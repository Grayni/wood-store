<template lang="pug">
  el-select(v-model="category" @change="senderCategory" placeholder="Выбор категории")
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
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'selector-category',
    data() {
      return {
        category: ''
      }
    },
    computed: {
      ...mapGetters('categories', ['subcategoriesList'])
    },
    methods: {
      ...mapActions('categories', ['fetchSubcategoriesList']),
      senderCategory() {}
    },
    async created() {
      this.fetchSubcategoriesList()
    }
  }
</script>

<style lang="stylus">
</style>
