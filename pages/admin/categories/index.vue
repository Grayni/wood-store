<template lang="pug">
  .categories
    h2.admin-title Таблица категорий
    .table-box-wrapper
      el-table.table-box(
        :data="categories.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        :default-sort="{prop: 'date', order: 'descending'}"
      )
        el-table-column(type="index" label="№" width="50" sortable)
        el-table-column(prop="title" label="Название категории" min-width="200" width="auto" sortable)
        el-table-column(prop="identifier" label="ID NAME" width="200px" sortable)
        el-table-column(prop="parent.label" label="Родитель" width="140px" align="center" sortable)
          template(v-slot:default="scope")
            el-tag(:type="scope.row.parent.label === 'первородный' ? 'danger' : 'success'" disable-transitions)
              | {{scope.row.parent.label}}

        el-table-column(label="Статус показа" width="140px" align="center" prop="status" sortable :sort-method="sortStatus")
          template(v-slot:default="scope")
            el-switch(:value="scope.row.status" @input="changeStatusCategory(scope.row.identifier, scope.row.status)")

        el-table-column(label="Действия" width="152")
          template(slot="header" slot-scope="scope")
            el-input(v-model="search" size="mini" placeholder="Type to search")

          template(slot-scope="{row}")
            el-tooltip.item(effect="dark" content="Редактировать категорию" placement="top")
              el-button(icon="el-icon-edit" type="info" circle @click="open(row.identifier)")

            el-tooltip(effect="dark" content="Удалить категорию" placement="top")
              el-button(icon="el-icon-delete" type="danger" circle @click="remove(row.identifier)")

      add(:urls="'/admin/categories/category-create'" :title="'Добавить категорию'")
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'categories-page',
    middleware: ['admin-auth'],
    layout: 'admin',
    head() {
      return {
        title: 'Категории',
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: 'Таблица категорий с ссылками на каждую категорию.'
          }
        ]
      }
    },
    data() {
      return {
        search: ''
      }
    },
    computed: {
      ...mapGetters('categories', ['categories'])
    },
    methods: {
      ...mapActions('categories', ['fetchList', 'changeStatus', 'deleteCategory']),

      sortStatus(a, b) {
        return a.status - b.status
      },
      async changeStatusCategory(identifier, status) {
        status = !status
        const message = await this.changeStatus({identifier, status})
        this.$message({message, center: true})
      },
      open(identifier) {
        this.$router.push(`/admin/categories/${identifier}`)
      },
      async remove(identifier) {
          const message = await this.deleteCategory({identifier})
          this.$message({message, center: true})
      }
    },
    async created() {
      await this.fetchList()
    }
  }


</script>

<style lang="stylus">
</style>
