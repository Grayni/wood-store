<template lang="pug">
  .cat-dependent
    .col-2(v-show="category.parent.value==='firstborn'")
      h2.decorate Зависимые категории:
      .show-child(v-if="category.parent.value === 'firstborn'")
        transition-group(name="list" tag="div" :class="'list-values'")
          div.list-childs(v-for="item in childrens" :key="item.title")
            el-tag.tag-dependencies
              nuxt-link.tag-link(:to="`/admin/categories/${item.identifier}`") {{item.title}}
            span.delete-times(@click="mixRemove({identifier: item.identifier}, deleteCategory)") &times;
    .col-2(v-show="category.parent.value!=='firstborn'")
      h2.decorate Родительская категория:
      el-tag.tag-dependencies
        nuxt-link.tag-link(:to="`/admin/categories/${category.parent.value}`") {{category.parent.label}}
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  import {removeConfirm} from '@/plugins/mixins/functions/removeConfirm'
  export default {
    name: 'cat-dependent',
    mixins: [removeConfirm],
    computed: {
      ...mapGetters('categories', ['childrens', 'category'])
    },
    methods: {
      ...mapActions('categories', ['getChildrens', 'deleteCategory']),
      ...mapMutations('categories', ['resetChildrens']),
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
  .cat-dependent
    .delete-times
      margin-left 5px
      cursor pointer
</style>
