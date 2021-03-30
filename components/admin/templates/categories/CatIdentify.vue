<template lang="pug">
  .cat-identify.col-1
    h2.decorate Изменить свойства категории:
    el-form-item.mb(label="Название категории" prop="title")
      el-input.input-service(:value="category.title" @input="changeTitle")

    el-form-item.mb(label="Название тега", prop="identifier")
      el-input.input-service(:value="category.identifier" @input="getChangeIdentifier")

    el-form-item.mb(label="Родитель", prop="parent")
      cat-firstborns

    el-form-item(label="Статус показа", prop="switch")
      el-switch(:value="category.status" @input="changeLocalStatus" active-text="Видно" inactive-text="Скрыто")

    el-form-item.button-wrap
      el-button(type="primary" native-type="submit" :loading="loading")
        span.text-button {{nameButton}}
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {transliter} from '@/plugins/mixins/transliter'
  export default {
    name: 'cat-identify',
    mixins: [transliter],
    data() {
      return {
        nameButton: 'Создать категорию'
      }
    },
    watch: {
      'category.title'() {
        if (!this.$route.params.identifier)
          this.updateLocalIdentifier(this.translit(this.category.title))
      }
    },
    computed: {
      ...mapGetters('categories', ['category', 'loading'])
    },
    methods: {
      ...mapMutations('categories', ['changeTitle', 'changeIdentifier', 'changeLocalStatus', 'updateLocalIdentifier', 'resetCategory']),

      getChangeIdentifier(event) {
        this.changeIdentifier(event)
      }
    },
    created() {
      if (this.$route.params.identifier) this.nameButton = 'Внести изменения'
    },
    beforeDestroy() {
      this.resetCategory()
    }

  }
</script>

<style lang="stylus">
</style>
