var chai = require('chai'),
    should = chai.should,
    expect = chai.expect,
    Promise = require('bluebird'),
    request = require('superagent-promise')(require('superagent'), Promise),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaisAsPromised);

var url = process.env.URL || 'http://localhost:8000/todos';

describe('Cross Origin Requests' function() {
  var result;
  before(function() {
      result = request('OPTIONS', url)
        .set('Origin', 'http://someplace.com')
        .end();
  });

  it('should return the correct CORS headers', function() {
    return assert(result, "header").to.contain.all.keys([
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers'
    ]);
  });
  it('should allow all origins', function() {
    return assert(result, "header.access-control-allow-origin").to.equal('*');
  });

});
/*
 * Convenience functions
 */

// POST request with data and return promise

function post(url, data) {
  return request.post(url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

