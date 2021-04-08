<template lang="pug">
  .redact-create.products
    h1.admin-title Таблица товаров

    el-form.block(:model="product" :rules="rules" label-position="right" size="small")
      .container-1
        el-form-item(label="Название товара" prop="title")
          el-input(:value="product.title" @input="changeTitle" placeholder="Полное название товара")
        
        el-form-item.name-service.mb(label="Название тега" prop="identifier")
          el-input( :value="product.identifier" @input="changeIdentifier" placeholder="Название товара на латинице, слитно")

        .wrap-duble
          el-form-item(label="Категория товара" prop="category")
            selector-category

          .rate-wrap
            el-form-item.rate(label="Рейтинг товара")
              el-rate(:value="product.rate" @input="changeRate")


        //- el-form-item(label="Oписание товара" prop="description")
        //-   el-input(type="textarea" v-model="product.description" :autosize="{minRows: 4}" placeholder="Ввести описание для SEO")

        //- .wrap-duble
        //-   el-form-item(label="Цена" prop="price")
        //-     el-input-number(v-model="product.price" :min="0" :max="200000" :product="false" )

        //-   el-form-item(label="Скидка %" prop="sale")
        //-     el-input-number(v-model="product.sale" :min="0" :max="50" :product="false")

        //- .wrap-duble
        //-   el-form-item(label="Количество товара (Для админа)" prop="amount")
        //-     el-input-number(v-model="product.amount" :min="0" :max="50" :product="false")

        //-   el-form-item(label="Статус товара (для клиента)" prop="availability")
        //-     el-select(v-model="product.availability.label" placeholder="Выбрать статус")
        //-       el-option(v-for="item in availabilityList" :key="item.label" :label="item.label" :value="item.value")

        //- el-form-item(label="Отображение товара" prop="display")
        //-   el-radio-group.radio-display(v-model="product.display")
        //-     el-radio-button(v-for="(status, i) in productDisplay" :key="`status-${i}`" :label="status")

        el-form-item(label="Добавить характеристику")
          //- selector-characteristics

        //- .characteristics
        //-   el-form-item(v-for="(characteristic, i) in characteristicsList" :key="characteristic+i" :label="characteristic" prop="display")
        //-     el-checkbox-group(v-model="product.characteristics" size="mini")
        //-       el-checkbox-button(v-for="(item, j) in characteristic" :label="item.title" :key="item+j" @change="selectValue") {{item}}


        //-   el-form-item(label="Характеристики товара")
        //-     el-select(v-model="characteristicValue" placeholder="Выбрать характеристику" @change="addCharacteristic")
        //-       el-option(
        //-         v-for="characteristic in characteristics"
        //-         :key="characteristic.label"
        //-         :label="characteristic.label"
        //-         :value="characteristic.value"
        //-       )
        div(style="width: 100%; height: 300px; background: #d9d9d9; display: flex; justify-content: center; align-items: center;")
          p Характеристики
        br

        h2.mb Дополнительные опции
        //- .wrap-duble
        //-   dimensions(:label-name="'Габариты товара (Длина х Ширина х Высота)'")
        //-   dimensions(:label-name="'Размер упаковки (Длина х Ширина х Высота)'")
        //-   weight(
        //-     @weight="product.weight.value = $event"
        //-     @unit="product.weight.unit = $event"
        //-   )
        //-   property-string(:label="'Артикул'")

      .container-2
        el-form-item.avatar-product(label="Главное изображение" placeholder="Выберите изображение")
        //-   el-upload(
        //-     class="upload-demo"
        //-     list-type="picture-card"
        //-     ref="upload"
        //-     action=""
        //-     :multiple="true"
        //-     :on-preview="handlePreview"
        //-     :on-remove="handleRemove"
        //-     :on-change="handleChange"
        //-     :auto-upload="false"
        //-     :file-list="fileList"
        //-   )
        //-     i.el-icon-plus

        //-   .wrap-upload
        //-     el-button.upload(v-if="fileList.length" size="small" type="success" @click="submitUpload") Загрузить

        //- el-dialog(:visible.sync="dialogVisible")
        //-   img(width="100%" :src="dialogImageUrl" alt="")

      //- el-form-item(label="Главное изображение в трех размерах")
      //- el-form-item(label="Галерея изображений товара" thumbnails)
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {validateForm} from '@/plugins/mixins/validateForm'
  import {transliter} from '@/plugins/mixins/transliter'

  import availabilityList from '@/storage/availability'
  import productDisplay from '@/storage/productDisplay'

  export default {
    name: 'product-create',
    middleware: ['admin-auth'],
    layout: 'admin',
    mixins: [validateForm, transliter],
    head() {
      return {
        title: 'Создание документа товара',
        meta: [
          {
            hid: `description-${this.$route.name}`,
            name: 'description',
            content: 'Страница параметров и свойств для создания товара'
          }
        ]
      }
    },
    data() {
      return {
        characteristicsList: [],
        characteristicValue: '',
        availabilityList,
        productDisplay,
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    watch: {
      'product.title'() {
        this.changeIdentifier(this.translit(this.product.title))
      }
    },
    computed: {
      ...mapGetters('products', [
        'product',
        'title',
        'rate'
      ])
    },
    methods: {
      ...mapMutations('products', [
        'changeTitle',
        'changeIdentifier',
        'changeRate'
      ])
      // handlePreview(file) {this.dialogImageUrl = file.url, this.dialogVisible = true},
      // handleRemove(file, fileList) {this.fileList = fileList},
      // handleChange(file, fileList) {this.fileList = fileList},
      // submitUpload(file) {this.$refs.upload.submit()},
      // getParam(event, variable) {variable = event},

      // addCharacteristic() {
      //   this.characteristicsList.push(this.characteristicValue)
      // },
      // selectValue() {
      //   console.log(this.product.characteristics)
      // },
      // assignment(value) {
      //   console.log(value)
      // }
    },
    async created() {
    }
  }
</script>

<style lang="stylus">
  .redact-create
    &.products
      max-width 100%
      .block
        display grid
        grid-template-areas "container-1 container-2"
        grid-template-columns 9fr 11fr
      .container-1
        grid-area container-1
        border-right 1px solid #ddd
        padding-right 20px
        .el-form-item__content
          margin-right 10px

        .el-input-number
          width 100%
      .container-2
        grid-area container-2
        padding-left 20px

    .el-form-item__label
      float none
    .el-form-item__content
      margin-left 0
    .wrap-upload
      padding-top 10px
  .wrap-duble
    display grid
    grid-template-columns 1fr 1fr
  .radio-display
    span
      font-weight 600
  .rate
    float right
</style>
