<template lang="pug">
  .redact-create
    el-page-header.header-page(@back="'/admin/categories'" content="создание категории товаров")
    el-form(
      :model="controls"
      :rules="rules"
      ref="create-category"
      @submit.native.prevent="onSubmit('create-category')"
    )
      el-form-item.name-service(label="Название категории" prop="title")
        el-input.input-service(v-model="controls.title")

      el-form-item.name-service.mb(label="Название тега" prop="tag")
        el-input.input-service( v-model="controls.tag")

      el-form-item.name-service.mb(label="Родитель" prop="parent")
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

      el-form-item.button-wrap
        el-button(
          type="primary"
          native-type="submit"
          :loading="loading"
        )
          span.text-button Создать категорию
</template>

<script>
  import {validateForm} from '@/plugins/mixins/validateForm'
  import {transliter} from '@/plugins/mixins/transliter'

  export default {
    name: 'category-create-page',
    middleware: ['admin-auth'],
    layout: 'admin',
    mixins: [validateForm, transliter],
    data() {
      return {
        loading: false,
        initControls: {},
        controls: {
          title: '',
          tag: '',
          parent: {
            label: 'первородный',
            value: 'firstborn'
          },
          status: false
        },
      }
    },
    async asyncData({store}) {
      const firstborns = await store.dispatch('categories/fetchParentCategories', {value: 'firstborn'})
      return {firstborns}
    },
    watch: {
      'controls.title'() {
        this.controls.tag = this.translit(this.controls.title)
      },
      'controls.parent.value'() {
        this.controls.parent.label = (this.firstborns.filter(v => v.value === this.controls.parent.value)[0]).label
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {

          if (valid) {
            this.loading = true

            try {
              const message = await this.$store.dispatch('categories/create', this.controls)
              this.$message({message, center: true})

              // return initial data
              this.controls = JSON.parse(JSON.stringify(this.initControls))

            } catch (e) {} finally { this.loading = false }

          } else {
            this.$message.error('Некорректно заполнены обязательные поля.')
          }
        })
      }
    },
    created() {
      // create default data 
      this.initControls = JSON.parse(JSON.stringify(this.controls))
    }
  }
</script>

<style lang="stylus">
</style>
