const assert = require('assert');
const app = require('../../src/app');

describe('\'tracks\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/tracks');

    assert.ok(service, 'Registered the service');
  });
});
