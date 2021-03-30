<template lang="pug">
  .category-redactor
    section-title(:section="'Категория'" :title="category.title")
    el-form.col.col_two(
      :model="category"
      :rules="rules"
      ref="category"
      @submit.native.prevent="onSubmit('category')"
    )
      cat-identify
      cat-dependent

</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {validateForm} from '@/plugins/mixins/validateForm'
  import {notifyWarn} from '@/plugins/mixins/functions/characteristicParams'
  export default {
    name: 'category_redact',
    middleware: ['admin-auth'],
    mixins: [notifyWarn],
    layout: 'admin',
    head() {
      return {
        title: this.category.title,
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: `Редактирование данных категории "${this.category.parent.label}"`
          }
        ]
      }
    },
    mixins: [validateForm, notifyWarn],
    computed: {
      ...mapGetters('categories', ['category', 'categoryInitial'])
    },
    methods: {
      ...mapActions('categories', ['getCategory', 'updateCategory', 'updateFirstbornInChild']),
      ...mapMutations('categories', ['initCategory', 'changeLoading']),

      compareCategoryState() { // has change category state?
        const keys = Object.keys(this.categoryInitial)

        let result = keys.every(x => {
          if (typeof this.categoryInitial[x] === 'object') // parent obj
            return this.categoryInitial[x].value === this.category[x].value

          return this.categoryInitial[x] === this.category[x]
        })

        return result
      },

      async updateChildsParent() {
        const message = await this.updateFirstbornInChild({
          identifier: this.categoryInitial.identifier,
          parent: {
            value: this.category.identifier,
            label: this.category.title
          }
        }) // update dependencies-child

        await this.$notify.success(message)
      },

      onSubmit(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            try {
              this.changeLoading(true)

              {
                const result = this.compareCategoryState()
                if (result) return this.mixNotifyWarn('Измените данные для сохранения')
              }
              
              const message = await this.updateCategory({
                category: this.category,
                identifier: this.categoryInitial.identifier
              })


              
              if (this.$route.params.identifier !== this.category.identifier) { // if identifier change
                this.$router.push(`/admin/categories/${this.category.identifier}`) // load page with new url
                await this.updateChildsParent()
              } else if (this.categoryInitial.title !== this.category.title) { // if change title parent category
                await this.updateChildsParent()
              }

              await this.$notify.success(message)

              this.initCategory() // update initial category

            } catch (e) {} finally { this.changeLoading(false) }
          }
        })
      }
    },
    async created() {
      await this.getCategory(this.$route.params.identifier)
      this.initCategory() // record initial state of the category
    }
  }
</script>

<style lang="stylus">
  .list-childs
    margin-bottom 5px
</style>