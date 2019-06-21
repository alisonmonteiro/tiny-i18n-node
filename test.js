import test from 'ava'
import m from '.'

test('try to translate invalid terms', t => {
  const termString = 'invalid string'
  const expectString = ''

  const termUndefined = undefined
  const expectUndefined = ''

  const termObject = {}
  const expectObject = ''

  t.is(m(termString), expectString)
  t.is(m(termUndefined), expectUndefined)
  t.is(m(termObject), expectObject)
})

test('try to translate invalid terms but with default value', t => {
  const termDefault = 'Oops!'
  const invalidTermWithDefault = undefined

  const termInvalidDefaultCorrection = ''
  const termInvalidDefault = {}
  const invalidTermWithInvalidDefault = undefined

  t.is(m(invalidTermWithDefault, termDefault), termDefault)
  t.is(m(invalidTermWithInvalidDefault, termInvalidDefault), termInvalidDefaultCorrection)
})

test('translate plain and not plain items', t => {
  const term = 'test'
  const expect = 'Test'

  const termTwo = 'social.twitter'
  const expectTwo = 'twitter.com/twitter'

  const termThree = 'footer.address.zip'
  const expectThree = '60000'

  t.is(m(term), expect)
  t.is(m(termTwo), expectTwo)
  t.is(m(termThree), expectThree)
})

// New location
test('translate using different locales', t => {
  m.setLocale('es')
  t.is(m('test'), 'Teste')

  m.setLocale('en')
  t.is(m('test'), 'Test')
})

test('try to translate with invalid locale', t => {
  m.setLocale('esnds_')
  t.is(m([]), false)
  t.is(m({}), false)
  t.is(m('testing string'), false)
})

test('try to translate passing a default value with an invalid locale', t => {
  m.setLocale('invalid_xs')
  t.is(m('testing string', []), false)
  t.is(m('testing string', ''), false)
  t.is(m('testing string', 'default'), 'default')
})
