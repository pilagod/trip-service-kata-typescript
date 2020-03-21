import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
import User from '@user/User';
import UserSession from '@user/UserSession';
import Trip from '@trip/Trip';
import TripDAO from '@trip/TripDAO';

export default class TripService {

  public getTripsByUser(user: User): Trip[] {
    const loggedUser: User = this.getLoggedUser();
    if (loggedUser === null) {
      throw new UserNotLoggedInError();
    }
    if (!loggedUser.isFriendOf(user)) {
      return [];
    }
    return this.findTripsByUser(user);
  }

  protected getLoggedUser(): Nullable<User> {
    return UserSession.getLoggedUser();
  }

  protected findTripsByUser(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }
}
