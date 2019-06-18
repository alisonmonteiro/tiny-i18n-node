import test from 'ava'
import m from '.'

test('translate term', t => {
  const term = 'simple'

  t.is(m(term), term, 'Simple term translation')
})
