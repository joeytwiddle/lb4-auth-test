import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy} from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {BasicStrategy} from 'passport-http';
const {
  NoAuthStrategy,
  OptionalAuthStrategy,
} = require('optional-auth-strategy');

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
  ) {}

  value(): ValueOrPromise<Strategy | undefined> {
    console.log('!!this.metadata:', !!this.metadata);
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    console.log('name:', name);
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify);
    } else if (name === 'NotNeeded') {
      return new NoAuthStrategy(() => {});
    } else if (name === 'OptionalStrategy') {
      return new OptionalAuthStrategy(new BasicStrategy(this.verify));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify(
    username: string,
    password: string,
    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) {
    console.log(`Verifying user: ${username} ---${password}---`);
    if (username === 'test' && password === 'test') cb(null, {id: '1'});
    else cb(null, false);
  }
}
