import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
import Trip from '@trip/Trip';
import TripService from '@trip/TripService';
import User from '@user/User';

describe('TripService', () => {

  function createTripServiceWithLoggedUser(user: Nullable<User>): TripService {
    const service = new TripServiceUnderTest();
    service.givenLoggedUser(user);
    return service;
  }

  describe('getTripsByUser', () => {

    it('should throw UserNotLoggedInError when use is not logged in', () => {
      const service = createTripServiceWithLoggedUser(null);

      const getTripsByUser = () => service.getTripsByUser(new User());

      expect(getTripsByUser).toThrowError(UserNotLoggedInError);
    });

    it('should return empty trips when logged user is not friend of given user', () => {
      const user = new User();
      user.addTrip(new Trip());

      const loggedUser = new User();

      const service = createTripServiceWithLoggedUser(loggedUser);

      const trips = service.getTripsByUser(user);

      expect(trips).toHaveLength(0);
    });

    it('should return trips when logged user is friend of given user', () => {
      const user = new User();

      const loggedUser = new User();
      user.addFriend(loggedUser);

      const trips = [new Trip(), new Trip()];
      trips.forEach(t => user.addTrip(t));

      const service = createTripServiceWithLoggedUser(loggedUser);

      const gotTrips = service.getTripsByUser(user);

      expect(gotTrips).toEqual(trips);
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

  // expect there is a method called findTripsByUser on TripService that can be overridden
  protected findTripsByUser(user: User): Trip[] {
    return user.getTrips();
  }
}
