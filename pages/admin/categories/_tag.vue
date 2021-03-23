<template lang="pug">
  .redact-create
    el-page-header.header-page(@back="$router.go(-1)" :content="'редактор категории / ' + this.controls.title")
    el-form(
      :model="controls"
      :rules="rules"
      ref="create-category"
      @submit.native.prevent="onSubmit('create-category')"
    )
      el-form-item.name-service.mb(label="Название категории" prop="title")
        el-input.input-service(v-model="controls.title")

      el-form-item.name-service.mb(label="Название тега", prop="tag")
        el-input.input-service( v-model="controls.tag")

      el-form-item.name-service.mb(label="Родитель", prop="parent")
        el-select(v-model="controls.parent.value" placeholder="Выбор категории или нулевого уровня")
          el-option(
            v-for="item in firstborns"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          )

      el-form-item.name-service(label="Статус показа", prop="switch")
        el-switch(
          v-model="controls.status"
          active-text="Видно"
          inactive-text="Скрыто"
        )

      .show-child(v-if="controls.parent.value === 'firstborn'")
        h2.admin-title Зависимые категории:
        ul.list-childs(v-for="item in childrens" :key="item.title")
          li {{item.title}}

      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )
          span.text-button Внести изменения

</template>

<script>
  import {validateForm} from '@/plugins/mixins/validateForm.mixin'
  export default {
    name: 'category_redact',
    layout: 'admin',
    middleware: ['admin-auth'],
    mixins: [validateForm],
    data() {
      return {
        loading: false
      }
    },
    async asyncData({store, params}) {
        const tag = params.tag
        const controls = await store.dispatch('categories/getCategory', tag)
        const firstborns = await store.dispatch('categories/fetchParentCategories', {value: 'firstborn'})
        const titleInit = controls.title
        let childrens = []
        if (controls.parent.value === 'firstborn') {
           childrens = await store.dispatch('categories/getChildrens', {tag})
        }
        return {controls, firstborns, tag, titleInit, childrens}
    },
    watch: {
      'controls.parent.value'() {
        this.controls.parent.label = (this.firstborns.filter(v => v.value === this.controls.parent.value)[0]).label
      }
    },
    methods: {
      async onSubmit() {
        try {
          this.loading = true

          await this.$store.dispatch('categories/updateCategory', {category: this.controls, tag: this.tag})

          if (this.tag !== this.controls.tag || this.titleInit !== this.controls.title) {
            this.$router.push(`/admin/categories/${this.controls.tag}`)

            if (this.controls.parent.value === 'firstborn') {
              const parentNew = {label: this.controls.title, value: this.controls.tag}
              const message = await this.$store.dispatch('categories/updateFirstborn', {tag: this.tag, parent: parentNew})
              this.$message({ message, center: true})
              this.firstborns = await this.$store.dispatch('categories/fetchParentCategories', {value: 'firstborn'})

            }
          }

          this.$message({ message: 'Категория обновлена.', center: true })
        } catch (e) {} finally {
          this.loading = false
        }
      }
    }
  }
</script>

<style lang="stylus">
  .show-child
    .admin-title
      font-size 20px
      margin-top 30px
  .list-childs
    list-style-type disc
    margin 0 0 10px 20px
    color #606266
</style>
