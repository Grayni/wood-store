export const statusLabel = {
  data() {
    return {
      mixOptions: [
        {
          label: 'Администратор',
          value: 'admin'
        }, {
          label: 'Новый клиент',
          value: 'new_client'
        }, {
          label: 'Постоянный',
          value: 'constant'
        }, {
          label: 'Ждет звонка',
          value: 'wait_call'
        }, {
          label: 'Звонок для подтверждения заказа',
          value: 'call_confirmation'
        }, {
          label: 'Оплатил, ждет доставку',
          value: 'pay_wait_delivery'
        }, {
          label: 'Оплатил, самовывоз',
          value: 'Paid_pickup'
        }, {
          label: 'Оплата при доставке',
          value: 'payment_on_delivery'
        }, {
          label: 'Оплата при самовывозе',
          value: 'payment_upon_pickup'
        }, {
          label: 'Завершенный заказ',
          value: 'completed_order'
        }, {
          label: 'Отмененный заказ',
          value: 'canceled_order'
        }, {
          label: 'Собирает корзину',
          value: 'collects_cart'
        }, {
          label: 'Предзаказ',
          value: 'pre-order'
        }, {
          label: 'Брошенная корзина',
          value: 'abandoned_cart'
        }
      ]
    }
  },
}