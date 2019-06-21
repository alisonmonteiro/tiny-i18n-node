# tiny-translation-node
The simplest NodeJS i18n module

## Usage

First of all, create your `lang/*.json` files.

en.json
```json
{
  "module": {
    "description": "The simplest NodeJS i18n module"
  }
}
```

es.json
```json
{
  "module": {
    "description": "El módulo de internacionalización NodeJS más sencillo"
  }
}
```

Then use it:

```javascript
const trans = require('tiny-i18n-node')

trans('module.description') //=> "Tiny module to handle NodeJS i18n"
```

You get the current location:

```javascript
trans.getLocale() //=> Default: "en"
```

Or switch between them:

```javascript
// Switch to Spanish
trans.setLocale('es')
trans('module.description') //=> "Pequeño módulo para manejar la internacionalización de Node JS"
```
