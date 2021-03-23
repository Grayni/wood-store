<template lang="pug">
  el-menu.aside-admin-menu(
    router
    :default-active="$route.path"
    text-color="#fffdec"
    background-color="#252525"
  )
    //app-logo-background
    el-menu-item(index="/admin")
      i.el-icon-pie-chart
      span Аналитика
    
    el-submenu(index="1")
      template(slot="title")
        i.el-icon-collection
        span Товары
      el-menu-item(index="/admin/products")
        i.el-icon-notebook-2
        span Таблица товаров
      el-menu-item(index="/admin/products/product-create")
        i.el-icon-document-add
        span Создать товар

    el-menu-item(index="/admin/users")
      i.el-icon-user
      span Список пользователей

    el-menu-item(index="/admin/categories")
      i.el-icon-finished
      span Список категорий

    el-menu-item(index="/admin/characteristics")
      i.el-icon-setting
      span Характеристики

    el-submenu(index="2")
      template(slot="title")
        i.el-icon-film
        span Типы
      el-menu-item(index="/admin/types")
        i.el-icon-document-add
        span Список типов
      el-menu-item(index="/admin/types/type-create")
        i.el-icon-notebook-2
        span Создать тип

    el-menu-item(index="/admin/orders")
      i.el-icon-plus
      span Заказы

    el-menu-item(index="/admin/sales")
      i.el-icon-plus
      span Продажи

    el-menu-item(index="/admin/news")
      i.el-icon-plus
      span Новости

    el-menu-item(index="/admin/logout")
      i.el-icon-switch-button
      span Выйти
</template>

<script>
  export default {
    data() {
      return {
        name: 'aside-menu'
      }
    },
  }
</script>

<style lang="stylus">
.aside-admin-menu
  height 90%
  //overflow-x hidden
  border-right 1px solid #252525
  padding-top 20px
  .el-menu-item, .el-submenu__title, .el-menu--inline
    background-color transparent!important
    font 400 14px/56px Circe

  &>.el-menu-item, &>.el-submenu
    border-bottom 1px solid #555
    // font 400 16px/56px Circe
    // border-bottom 1px solid #555
</style>
