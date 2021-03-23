export const transliter = {
  methods: {
    translit(str) {
      let ru = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
          'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
          'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
          'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
          'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
          'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
      }

      let n_str = []

      str = str.replace(/й/g, 'i')
               .replace(/\s/g, '_')
               .replace(/\-/g, '_')
               .replace(/[ъь«».,\/#!$%\^&\*;:{}=`~()\?]/g,'')
               .toLowerCase()

      for (let key of str) {
        if (ru[key]) n_str.push(ru[key])
        else n_str.push(key)
      }
      return n_str.join('');
    }
  }
}