
export const validateForm = {
  
  data() {

    const validatePassRepeat = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('Пожалуйста, введите пароль еще раз'))
      } else if (value !== this.controls.pass) {
        callback(new Error('Пароли не совпадают!'))
      } else {
        callback()
      }
    }

    const validatePassOld = async (rule, value, callback) => {
      // for checked use oldpass and id-user
      const validate = {
        pass: this.controls.oldpass,
        id: this.$route.params.id
      }

      const check = await this.$store.dispatch('validate/checkOldPass', validate)

      if (!check && value.length !== 0) {
        callback(new Error(rule.message))
      }
    }

    const validatePassNew = async (rule, value, callback) => {
      if(this.controls.oldpass.length === 0 && this.controls.newpass.length) {
        callback(new Error(rule.message))
      }
    }

    const uniqueValue = async (rule, value, callback) => {

      const formData = { field: rule.fieldKey, value }
      const unique = await this.$store.dispatch('validate/uniqueValue', formData)

      unique ? callback(new Error(rule.message)) : callback()
    }

    const uniqueValueOld = async (rule, value, callback) => {

      if (value !== this.user[rule.fieldKey]) {
        return uniqueValue(rule, value, callback)
      } else {
        callback()
      }
    }

    const uniqueIdentifier = async (rule, value, callback) => {
      const section = /(?:^admin-)(\w+)/.exec(this.$route.name)[1]

      if (section === 'categories') // if value not change
        if (this.$route.params.identifier === value) return callback()

      const unique = await this.$store.dispatch('validate/checkIdentifier', {value, section})

      unique ? callback(new Error(rule.message)) : callback()
    }

    return {
      safeData: '',
      rules: {
        status: [
          {
            type: 'string',
            required: true,
            min: 1,
            message: 'Выберите статус пользователя'
          }
        ],
        surname: [
          {
            type: 'string',
            required: true,
            min: 2,
            message: 'Минимальное количество символов 2',
            trigger: 'blur'
          }, {
            pattern: /^[a-zа-я\s]+$/gi,
            message: 'Фамилия должна состоять только из пробелов и букв',
            trigger: 'blur'
          }, {
            max: 30,
            message: 'Максимальное количество символов 30',
            trigger: 'blur'
          }
        ],
        name: [
          {
            type: 'string',
            required: true,
            min: 2,
            message: 'Минимальное количество символов 2',
            trigger: 'blur'
          }, {
            pattern: /^[a-zа-я\s]+$/gi,
            message: 'Имя должно состоять только из пробелов и букв',
            trigger: 'blur'
          }, {
            max: 30,
            message: 'Максимальное количество символов 30',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            min: 3,
            message: 'Пожалуйста, введите корректный Email',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            trigger: 'blur'
          },
          {
            required: true, 
            validator: uniqueValue,
            fieldKey: 'email',
            message: 'Почта уже используется. Введите другой Email',
            trigger: 'blur'
          }
        ],
        oldemail: [
          {
            required: true,
            type: 'email',
            min: 3,
            message: 'Пожалуйста, введите корректный Email',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            trigger: 'blur'
          },
          {
            required: true, 
            validator: uniqueValueOld,
            fieldKey: 'email',
            message: 'Почта уже используется. Введите другой Email',
            trigger: 'blur'
          }
        ],
        agree: [
          {
            type: 'array',
            required: true,
            message: 'Для отправки Вам необходимо дать свое согласие на обработку персональных данных',
            trigger: 'change'
          }
        ],
        text: [
          {required: true, message: 'Введите Ваш комментарий', trigger: 'blur'}
        ],
        login: [
          {
            type: 'string',
            message: 'Введите логин',
            trigger: 'blur'
          }, {
            pattern: /^[aA-zZ]+$/gi,
            message: 'Login должен состоять только из латинских букв',
            trigger: 'blur'
          }, {
            validator: uniqueValue,
            fieldKey: 'login',
            message: 'Login занят. Используйте другой Login',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            min: 18,
            required: true,
            message: 'Введите номер полностью',
            trigger: 'blur'
          }, {
            required: true, 
            validator: uniqueValue,
            fieldKey: 'phone',
            message: 'Номер телефона уже используется. Введите другой номер',
            trigger: 'blur'
          }
        ],
        oldlogin: [
          {
            type: 'string',
            message: 'Введите новый логин',
            trigger: 'blur'
          }, {
            pattern: /^[aA-zZ]+$/gi,
            message: 'Login должен состоять только из латинских букв',
            trigger: 'blur'
          }, {
            validator: uniqueValueOld,
            fieldKey: 'login',
            message: 'Такой логин занят, придумайте другой',
            trigger: 'blur'
          }
        ],
        oldphone: [
          {
            min: 18,
            message: 'Введите номер полностью',
            trigger: 'blur'
          },
          {
            validator: uniqueValueOld,
            fieldKey: 'phone',
            message: 'Номер телефона уже используется. Введите другой номер',
            trigger: 'blur'
          }
        ],
        user: [
          {
            message: 'Введите логин или email', trigger: 'blur'
          }, {
            max: 30,
            message: 'Максимальное количество символов 30',
            trigger: 'blur'
          }
        ],
        pass: [
          {
            required: true, message: 'Введите пароль', trigger: 'blur'
          }, {
            min: 6, message: 'Длина пароля должна быть не меньше 6 символов', trigger: 'blur'
          }
        ],
        passrep: [
          {
            validator: validatePassRepeat, message: 'Введите правильный старый пароль', trigger: 'blur',
          }
        ],
        oldpass: [
          {
            validator: validatePassOld, message: 'Введите правильный старый пароль', trigger: 'blur'
          }
        ],
        newpass: [
          {
            required: false, validator: validatePassNew, message: 'Введите сначала правильный старый пароль', trigger: 'blur'
          },
          {
            min: 6, message: 'Длина пароля должна быть не меньше 6 символов', trigger: 'blur'
          }
        ],
        article: [
          {
            required: true, message: 'Поле текста должно быть заполнено', trigger: 'blur'
          }
        ],
        title: [
          {
            required: true, message: 'Название обязательно', trigger: 'blur'
          }
        ],
        tag: [
          {
            type: 'string',
            required: true,
            message: 'Тег нужен для создания Url',
            trigger: 'blur'
          }
        ],
        parent: [
          {
            required: true, message: 'Родитель определяет уровень вложенности (введи: main => 0 уровень)', trigger: 'blur'
          }
        ],
        select: [
          {
            required: true, message: 'Выбор обязателен!', trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: 'Описание необходимо для продвижения',
            trigger: 'blur'
          },
          {
            min: 1000,
            required: true,
            message: 'Минимальный размер текста 1000 символов',
            trigger: 'blur'
          }
        ],
        price: [
          {
            type: 'number',
            required: true,
            message: 'Цена только из цифр',
            trigger: 'blur'
          }
        ],
        sale: [
          {
            type: 'number',
            required: true,
            message: 'Скидка целое число',
            trigger: 'blur'
          }
        ],
        amount: [
          {
            type: 'number',
            required: true,
            message: 'Должно быть число',
            trigger: 'blur'
          }
        ],
        availability: [
          {
            required: true, message: 'Раздел должен быть выбран', trigger: 'blur'
          }
        ],
        section: [
          {
            required: true, message: 'Раздел должен быть выбран', trigger: 'blur'
          }
        ],
        keys: [
          {
            required: true, message: 'Перечислите ключевые фразы', trigger: 'blur'
          }
        ],
        display: [
          {
            required: true, message: 'Тип отображения должен быть выбран', trigger: 'blur'
          }
        ],
        construct: [
          {
            required: true, message: 'Выберите один из конструкторов', trigger: 'blur'
          }
        ],
        identifier: [
          {
            required: true, message: 'id-name обязателен', trigger: 'blur'
          },
          {
            required: true,
            pattern: /^([a-zA-Z]+[a-zA-Z_\-]*)$/gi,
            message: 'Только латиница и без пробелов; Первый символ -> Буква',
            trigger: 'blur'
          },
          {
            required: true,
            validator: uniqueIdentifier,
            message: 'Характеристика уже существует',
            trigger: 'blur'
          }
        ],
        values: [
          {
            required: true,
            min: 1,
            message: 'От 1 значения в списке',
          }
        ]
      }
    }
  }
}