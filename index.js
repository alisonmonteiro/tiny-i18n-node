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
      if (error.code === 'ENOENT') {
        console.error(`File ${file} not found!`)
        return false
      }

      throw error
    }
  }

  setLocale(locale) {
    this.locale = locale
  }

  setDefaultValue(val) {
    const validDefault = isString(val) ? val : ''
    this.defaultValue = validDefault
  }
}

module.exports = function (term, defaultValue = '') {
  const trans = new Trans()
  trans.setDefaultValue(defaultValue)

  return trans.translator(term)
}

