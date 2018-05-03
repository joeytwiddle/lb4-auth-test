import {createClientForHandler, supertest} from '@loopback/testlab';
import {RestServer} from '@loopback/rest';
import {AuthApplication} from '../';

describe('UserController', () => {
  let app: AuthApplication;
  let server: RestServer;
  let client: supertest.SuperTest<supertest.Test>;

  before(givenAnApplication);

  before(givenARestServer);

  before(async () => {
    await app.boot();
    await app.start();
  });

  before(() => {
    client = createClientForHandler(server.requestHandler);
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /whoami expecting failure', async () => {
    await client
      .get('/whoami')
      .auth('BUST', 'BUST')
      .expect(401);
  });

  it('invokes GET /whoami expecting failure', async () => {
    await client
      .get('/whoami')
      .auth('test', 'test')
      .expect(200);
  });

  it('invokes GET /time', async () => {
    await client.get('/time').expect(200);
  });

  function givenAnApplication() {
    app = new AuthApplication({
      rest: {
        port: 0,
      },
    });
  }

  async function givenARestServer() {
    server = await app.getServer(RestServer);
  }
});
