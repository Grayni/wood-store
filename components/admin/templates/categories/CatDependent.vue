<template lang="pug">
  .cat-dependent
    .col-2(v-show="category.parent.value==='firstborn'")
      h2.decorate Зависимые категории:
      .show-child(v-if="category.parent.value === 'firstborn'")
        div.list-childs(v-for="item in childrens" :key="item.title")
          el-tag.tag-dependencies
            nuxt-link.tag-link(:to="`/admin/categories/${item.identifier}`") {{item.title}}
    .col-2(v-show="category.parent.value!=='firstborn'")
      h2.decorate Родительская категория:
      el-tag.tag-dependencies
        nuxt-link.tag-link(:to="`/admin/categories/${category.parent.value}`") {{category.parent.label}}
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'cat-dependent',
    computed: {
      ...mapGetters('categories', ['childrens', 'category'])
    },
    methods: {
      ...mapActions('categories', ['getChildrens']),
      ...mapMutations('categories', ['resetChildrens'])
    },
    beforeDestroy() {
      // clear list
      this.resetChildrens()
    },
    async mounted() {
      await this.getChildrens({identifier: this.$route.params.identifier})
    }
  }
</script>

<style lang="stylus">
</style>
