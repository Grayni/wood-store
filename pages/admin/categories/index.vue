<template lang="pug">
  .categories
    h2.admin-title Таблица категорий
    el-table(
      :data="categories.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      :default-sort="{prop: 'date', order: 'descending'}"
    )
      el-table-column(
        type="index"
        label="№"
        width="50"
        sortable
      )

      el-table-column(
        prop="title",
        label="Название категории"
        min-width="200"
        width="auto"
        sortable
      )

      el-table-column(
        prop="tag"
        label="Tag"
        width="200px"
        sortable
      )

      el-table-column(
        prop="parent.label"
        label="Родитель"
        width="140px"
        align="center"
        sortable
      )
        template(v-slot:default="scope")
          el-tag(
            :type="scope.row.parent.label === 'первородный' ? 'danger' : 'success'"
            disable-transitions
          )
            |  {{scope.row.parent.label}}

      el-table-column(
        label="Статус показа"
        width="140px"
        align="center"
        prop="status"
        sortable
        :sort-method="sortStatus"
      )
        template(v-slot:default="scope")
          el-switch(
            v-model="scope.row.status"
            @change="saveStatus(scope.row.tag, scope.row.status)"
          )

      el-table-column(
        label="Действия"
        width="152"
      )

        template(slot="header" slot-scope="scope")
          el-input(
            v-model="search"
            size="mini"
            placeholder="Type to search"
          )

        template(slot-scope="{row}")
          el-tooltip.item(
            effect="dark"
            content="Редактировать категорию"
            placement="top"
          )
            el-button(
              icon="el-icon-edit"
              type="info"
              circle
              @click="open(row.tag)"
            )
          el-tooltip(
            effect="dark"
            content="Удалить категорию"
            placement="top"
          )
            el-button(
              icon="el-icon-delete"
              type="danger"
              circle
              @click="remove(row.tag)"
            )

    add(:urls="'/admin/categories/category-create'" :title="'Добавить категорию'")
</template>

<script>
  export default {
    name: 'categories-page',
    middleware: ['admin-auth'],
    layout: 'admin',
    data() {
      return {
        search: ''
      }
    },
    async asyncData({store}) {
      const categories = (await store.dispatch('categories/fetchCategoriesList')).filter(v => v.tag !== 'firstborn')
      return {categories}
    },
    methods: {
      sortStatus(a, b) {
        return a.status - b.status
      },
      async saveStatus(tag, status) {
        const message = await this.$store.dispatch('categories/saveStatus', {tag, status})
        this.$message({message, center: true})
      },
      open(tag) {
        this.$router.push(`/admin/categories/${tag}`)
      },
      async remove(tag) {
        try {
          const message = await this.$store.dispatch('categories/deleteCategory', {tag})
          this.categories = this.categories.filter(v => v.tag !== tag)
          this.$message({message, center: true})
        } catch (e) {
          console.log(e)
        }
      }
    }
  }


</script>

<style lang="stylus">
</style>
