const fs = require('fs')
const path = require('path')

const isString = val => (
  typeof val === 'string' || Object.prototype.toString.call(val) === '[object String]'
)

const isPlainObject = val => (
  Object.prototype.toString.call(val) === '[object Object]'
)

const hasOwnProp = (obj, key) => (
  Object.prototype.hasOwnProperty.call(obj, key)
)

class Trans {
  constructor() {
    this.locale = 'en'
    this.file = './lang'
    this.defaultValue = null
  }

  normalizeKeys(keys, separator = '.') {
    const valid = isString(keys) ? keys : ''

    return valid.split(separator)
  }

  getEntries(translations, keys) {
    const keysList = this.normalizeKeys(keys)

    return keysList.reduce((result, key) => {
      if (isPlainObject(result) && hasOwnProp(result, key)) {
        return result[key]
      }

      return null
    }, translations)
  }

  translator(term) {
    const file = `${path.resolve(this.file)}/${this.locale}.json`

    try {
      const data = fs.readFileSync(file)
      const content = JSON.parse(data.toString('utf8'))

      return this.getEntries(content, term) || this.defaultValue
    } catch (error) {
      const fallback = this.defaultValue === '' ? false : this.defaultValue

      if (error.code === 'ENOENT') {
        console.error(`File ${file} not found!`)
        console.error(`${fallback ? ` - Default value ${fallback} will be applied` : ''}`)
        return fallback
      }

      console.error(error)
      return fallback
    }
  }

  _setLocale(locale) {
    this.locale = locale
  }

  _setDefaultValue(val) {
    const validDefault = isString(val) ? val : ''
    this.defaultValue = validDefault
  }
}

const instance = new Trans()

function translate(term, defaultValue = '') {
  instance._setDefaultValue(defaultValue)
  return instance.translator(term)
}

// Public
module.exports = translate
module.exports.setLocale = locale => instance._setLocale(locale)
module.exports.getLocale = () => instance.locale
