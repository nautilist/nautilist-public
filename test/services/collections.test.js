const assert = require('assert');
const app = require('../../src/app');

describe('\'collections\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/collections');

    assert.ok(service, 'Registered the service');
  });
});
