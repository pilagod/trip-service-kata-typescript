import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
import Logger, { NullLogger } from '@trip/Logger';
import Trip from '@trip/Trip';
import TripDAO from '@trip/TripDAO';
import User from '@user/User';
import UserSession from '@user/UserSession';

export default class TripService {

  private logger: Logger = new NullLogger();

  public getTripsByUser(user: User): Trip[] {
    this.logger.log('Nice to meet you! Welcome to use getTripsByUser API.');
    const loggedUser: User = this.getLoggedUser();
    if (loggedUser === null) {
      throw new UserNotLoggedInError();
    }
    if (!loggedUser.isFriendOf(user)) {
      return [];
    }
    return this.findTripsByUser(user);
  }

  public setLogger(logger: Logger): void {
    this.logger = logger;
  }

  protected getLoggedUser(): Nullable<User> {
    return UserSession.getLoggedUser();
  }

  protected findTripsByUser(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }
}
