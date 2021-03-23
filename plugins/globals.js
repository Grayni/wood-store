import Vue from 'vue'
import VueTheMask from 'vue-the-mask'

import DateFilter from '@/common/filters/date.filter'

Vue.use(VueTheMask)

Vue.filter('date', DateFilter)