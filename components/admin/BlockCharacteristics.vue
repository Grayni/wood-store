<template lang="pug">
  .characteristics
    //- el-form-item(v-for="(characteristic, i) in characteristicsList" :key="characteristic+i" :label="characteristic" prop="display")
    //-   el-checkbox-group(v-model="controls.characteristics" size="mini")
    //-     el-checkbox-button(v-for="(item, j) in characteristic" :label="item.title" :key="item+j" @change="selectValue") {{item}}

    el-form-item(label="Добавить характеристику" size="small")
      el-select(v-model="option" placeholder="Выбрать характеристику" @change="addInCharList")
        el-option(
          v-for="option in options"
          :key="option.label"
          :label="option.label"
          :value="option.value"
        )
</template>

<script>
// characteristic  => char
// characteristics => chars

  export default {
    name: 'characteristics-block',
    data() {
      return {
        options: [
          {
            label: 'упаковка',
            value: 'packaging' 
          },
          {
            label: 'страна-производитель',
            value: 'country'
          }, {
            label: 'цвет',
            value: 'color'
          }, {
            label: 'бренд',
            value: 'brend'
          }, {
            label: 'материал',
            value: 'material'
          }, {
            label: 'покрытие',
            value: 'coverage'
          }, {
            label: 'вид крепежа',
            value: 'fasteners'
          }],
          option: '',
          charList: []
      }
    },
    methods: {
      addInCharList() {
        this.charList.push(this.option)
      }
    }
  }
</script>

<style lang="stylus">
.characteristics
  max-width 400px
</style>
