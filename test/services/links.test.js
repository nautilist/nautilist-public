const assert = require('assert');
const app = require('../../src/app');

describe('\'links\' service', () => {
  it('registered the service', () => {
    const service = app.service('links');

    assert.ok(service, 'Registered the service');
  });
});
