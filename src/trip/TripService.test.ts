import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
import Trip from '@trip/Trip';
import TripService from '@trip/TripService';
import User from '@user/User';

describe('TripService', () => {

  describe('getTripsByUser', () => {
    it('should throw UserNotLoggedInError when use is not logged in', () => {
      const service = new TripServiceUnderTest();
      service.givenLoggedUser(null);

      const getTripsByUser = () => service.getTripsByUser(new User());

      expect(getTripsByUser).toThrowError(UserNotLoggedInError);
    });

    it('should return empty trips when logged user is not friend of given user', () => {
      const user = new User();
      user.addTrip(new Trip());

      const loggedUser = new User();

      const service = new TripServiceUnderTest();
      service.givenLoggedUser(loggedUser);

      const trips = service.getTripsByUser(user);

      expect(trips).toHaveLength(0);
    });
  });
});

class TripServiceUnderTest extends TripService {
  private user: Nullable<User> = null;

  // helper for test to change logged user
  public givenLoggedUser(user: Nullable<User>) {
    this.user = user;
  }

  protected getLoggedUser(): Nullable<User> {
    return this.user;
  }
}
