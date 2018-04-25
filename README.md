# auth

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

### Instructions

1. Create app by running `lb4 app lb4-auth-test`
2. Follow instruction provided in `@loopback/authentication` [README](https://github.com/strongloop/loopback-next/blob/master/packages/authentication/README.md)

3. Start app by running `npm start`
4. `curl -u username:password http://localhost:3000/whoami` should throw an error
5. `curl -u test:test http://localhost:3000/whoami` should return user id `1`
