import rules from './rules'
import mock from '@/utils/mock'

rules.forEach(function (item) {
  mock(item)
})
