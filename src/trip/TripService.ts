import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
import User from '@user/User';
import UserSession from '@user/UserSession';
import Trip from '@trip/Trip';
import TripDAO from '@trip/TripDAO';

export default class TripService {

  public getTripsByUser(user: User): Trip[] {
    let tripList: Trip[] = [];
    const loggedUser: User = this.getLoggedUser();
    let isFriend: boolean = false;
    if (loggedUser != null) {
      for (const friend of user.getFriends()) {
        if (friend === loggedUser) {
          isFriend = true;
          break;
        }
      }
      if (isFriend) {
        tripList = TripDAO.findTripsByUser(user);
      }
      return tripList;
    }
    throw new UserNotLoggedInError();
  }

  protected getLoggedUser(): Nullable<User> {
    return UserSession.getLoggedUser();
  }
}
