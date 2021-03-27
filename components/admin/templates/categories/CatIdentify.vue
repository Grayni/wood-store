<template lang="pug">
  .cat-identify.col-1
    h2.decorate Изменить свойства категории:
    el-form-item.mb(label="Название категории" prop="title")
      el-input.input-service(:value="category.title" @input="changeTitle")

    el-form-item.mb(label="Название тега", prop="identifier")
      el-input.input-service( v-model="category.identifier")

    el-form-item.mb(label="Родитель", prop="parent")
      cat-firstborns

    el-form-item(label="Статус показа", prop="switch")
      el-switch(v-model="category.status" active-text="Видно" inactive-text="Скрыто")

    el-form-item.button-wrap
      el-button(type="primary" native-type="submit" :loading="loading")
        span.text-button Внести изменения
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'cat-identify',
    props: {
      category: {
        type: Object
      }
    },
    methods: {
      ...mapMutations('categories', ['changeTitle'])
    },
    data() {
      return {
        loading: false
      }
    },

  }
</script>

<style lang="stylus">
</style>
