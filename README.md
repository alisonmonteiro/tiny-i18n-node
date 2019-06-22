# tiny-translation-node
The simplest NodeJS i18n module

## Install

```
$ npm install tiny-i18n-node
```

## Usage

First of all, create your `lang/*.json` files inside your root folder.

<details><summary>See some examples</summary>
<p>

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

br.json
```json
{
  "module": {
    "description": "O mais simples módulo de internacionalização utilizando NodeJS"
  }
}
```
</p>
</details>

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

## License

MIT © [Alison Monteiro](https://alisonmonteiro.com.br/)
