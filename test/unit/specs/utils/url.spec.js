import * as url from '@/utils/url'

describe('utils/url parse', () => {

  it('parse', () => {
    let query = 'a=1&b=2'
    expect(url.parse(query)).to.deep.equal({a: '1', b: '2'})

    query = 'a=1'
    expect(url.parse(query)).to.deep.equal({a: '1'})

    query = '?'
    expect(url.parse(query)).to.deep.equal({})

    query = ''
    expect(url.parse(query)).to.deep.equal({})

    query = 'http://www.baidu.com'
    expect(url.parse(query)).to.deep.equal({})

    query = 'http://www.baidu.com/?a=1'
    expect(url.parse(query)).to.deep.equal({a: '1'})

    query = null
    expect(url.parse(query)).to.deep.equal({})
  })

  it('stringify ', () => {
    let query = {a: 1}
    expect(url.stringify(query)).to.equal('a=1')

    query = {a: 1, b: 2}
    expect(url.stringify(query)).to.equal('a=1&b=2')

    query = null
    expect(url.stringify(query)).to.equal('')
  })

  it('appendQuery', () => {
    let path = 'http://www.baidu.com/'
    let query = {b: 2}
    expect(url.appendQuery(path, query)).to.equal('http://www.baidu.com/?b=2')

    path = 'http://www.baidu.com/?a=1'
    query = {b: 2}
    expect(url.appendQuery(path, query)).to.equal('http://www.baidu.com/?a=1&b=2')

    path = 'http://www.baidu.com/?a=1'
    query = 'b=2'
    expect(url.appendQuery(path, query)).to.equal('http://www.baidu.com/?a=1&b=2')
  })

  it('getHost', () => {
    let path = 'http://www.baidu.com/'
    expect(url.getHost(path)).to.equal('http://www.baidu.com/')

    path = 'http://127.0.0.1:8088/'
    expect(url.getHost(path)).to.equal('http://127.0.0.1:8088/')

    path = 'https://127.0.0.1:8088/path/path.html'
    expect(url.getHost(path)).to.equal('https://127.0.0.1:8088/')

    path = '/path/file.html'
    expect(url.getHost(path)).to.equal('')

  })

  it('getParams', () => {
    let regexPath = '/api/:type/:id'
    let path = '/api/abc/123'

    expect(url.getParams(regexPath, path)).to.deep.equal({type: 'abc', id: '123'})
  })

})
