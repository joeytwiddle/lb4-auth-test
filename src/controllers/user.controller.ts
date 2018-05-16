import {inject} from '@loopback/context';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';
import {get} from '@loopback/rest';

export class WhoAmIController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: UserProfile,
  ) {}

  @authenticate('NotNeeded')
  @get('/time')
  getTimeOfDay(): string {
    return String(new Date());
  }

  @authenticate('Optional')
  @get('/amiloggedin')
  amILoggedIn(): boolean {
    return !!this.user;
  }

  @authenticate('BasicStrategy')
  @get('/whoami')
  whoAmI(): string {
    return this.user.id;
  }
}
