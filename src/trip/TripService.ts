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
    this.logWelcomeMessage();
    return this.getTrips(user);
  }

  public setLogger(logger: Logger): void {
    this.logger = logger;
  }

  /* protected */

  protected getLoggedUser(): Nullable<User> {
    return UserSession.getLoggedUser();
  }

  protected findTripsByUser(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }

  /* private */

  private logWelcomeMessage() {
    this.logger.log('Nice to meet you! Welcome to use getTripsByUser API.');
  }

  private getTrips(user: User): Trip[] {
    const loggedUser: User = this.getLoggedUser();
    if (loggedUser === null) {
      throw new UserNotLoggedInError();
    }
    if (!loggedUser.isFriendOf(user)) {
      return [];
    }
    const trips = this.findTripsByUser(user);
    return this.sortTripsByPopularityInDecendingOrder(trips);
  }

  private sortTripsByPopularityInDecendingOrder(trips: Trip[]): Trip[] {
    return [...trips].sort((t1, t2) => {
      return t1.popularity > t2.popularity ? -1 : 1;
    });
  }
}
