import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
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
  });
});

class TripServiceUnderTest extends TripService {
  private user: Nullable<User> = null;

  // helper for test to change logged user
  public givenLoggedUser(user: Nullable<User>) {
    this.user = user;
  }

  // expect there is a method called getLoggedUser on TripService that can be overridden
  protected getLoggedUser(): Nullable<User> {
    return this.user;
  }
}
