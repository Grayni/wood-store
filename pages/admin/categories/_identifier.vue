<template lang="pug">
  .category-redactor
    section-title(:section="'Категория'" :title="category.title")
    el-form.col.col_two(
      :model="category"
      :rules="rules"
      ref="create-category"
      @submit.native.prevent="onSubmit('create-category')"
    )
      cat-identify(:category="category")
      //- .cat-dependent.col-2
      //-   .show-child(v-if="category.parent.value === 'firstborn'")
      //-     h2.decorate Зависимые категории:
      //-     div.list-childs(v-for="item in childrens" :key="item.title")
      //-       el-tag {{item.title}}

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {validateForm} from '@/plugins/mixins/validateForm'
  export default {
    name: 'category_redact',
    middleware: ['admin-auth'],
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
    mixins: [validateForm],
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('categories', ['category'])
    },
    methods: {
      ...mapActions('categories', ['getCategory'])
    },
    created() {
      this.getCategory(this.$route.params.identifier)
    }
    
  }
</script>

<style lang="stylus">
  .list-childs
    margin-bottom 5px
</style>



// async asyncData({store, params}) {
//         const identifier = params.identifier
//         const category = await store.dispatch('categories/getCategory', identifier)
//         const firstborns = await store.dispatch('categories/fetchParentCategories', {value: 'firstborn'})
//         const titleInit = category.title
//         let childrens = []
//         if (category.parent.value === 'firstborn') {
//            childrens = await store.dispatch('categories/getChildrens', {identifier})
//         }
//         return {category, firstborns, identifier, titleInit, childrens}
//     },
//     computed: {
//       title() {
//         return (this.category.parent.label).replace(/\W/, x => x.toUpperCase())
//       }
//     },
//     watch: {
//       'category.parent.value'() {
//         this.category.parent.label = (this.firstborns.filter(v => v.value === this.category.parent.value)[0]).label
//       }
//     },
//     methods: {
//       async onSubmit() {
//         try {
//           this.loading = true

//           // await this.$store.dispatch('categories/updateCategory', {category: this.category, identifier: this.identifier})
//           console.log(`(${this.identifier}, ${this.category.identifier}), (${this.titleInit}, ${this.category.title})`)
//           // if (this.identifier !== this.category.identifier || this.titleInit !== this.category.title) {
//           //   this.$router.push(`/admin/categories/${this.category.identifier}`)

//           //   if (this.category.parent.value === 'firstborn') {
//           //     const parentNew = {label: this.category.title, value: this.category.identifier}
//           //     const message = await this.$store.dispatch('categories/updateFirstborn', {identifier: this.identifier, parent: parentNew})
//           //     this.$message({ message, center: true})
//           //     this.firstborns = await this.$store.dispatch('categories/fetchParentCategories', {value: 'firstborn'})

//           //   }
//           // }

//           this.$message({ message: 'Категория обновлена.', center: true })
//         } catch (e) {} finally {
//           this.loading = false
//         }
//       }
//     }
