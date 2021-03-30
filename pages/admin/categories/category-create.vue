<template lang="pug">
  .category-redactor
    section-title(:section="'Создание категории'" :title="category.title")
    el-form.col.col_two(
      :model="category"
      :rules="rules"
      ref="category"
      @submit.native.prevent="onSubmit('category')"
    )
      cat-identify

</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {validateForm} from '@/plugins/mixins/validateForm'
  import {notifyWarn} from '@/plugins/mixins/functions/characteristicParams'
  import {transliter} from '@/plugins/mixins/transliter'

  export default {
    name: 'category-create-page',
    middleware: ['admin-auth'],
    mixins: [validateForm, transliter, notifyWarn],
    layout: 'admin',
    head() {
      return {
        title: 'Создать категорию',
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: 'Раздел для создания новых категорий.'
          }
        ]
      }
    },
    computed: {
      ...mapGetters('categories', ['category'])
    },
    methods: {
      ...mapActions('categories', ['createCategory']),
      ...mapMutations('categories', ['resetCategory', 'changeLoading']),
      onSubmit(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            try {
              this.changeLoading(true)

              const message = await this.createCategory(this.category)

              this.$notify.success(message)
              this.resetCategory()

            } catch (e) {} finally { this.changeLoading(false) }
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
</style>
