import { Nullable } from '@type';
import { UserNotLoggedInError } from '@error';
import Logger from '@trip/Logger';
import Trip from '@trip/Trip';
import TripRepository from '@trip/TripRepository';
import TripService from '@trip/TripService';
import User from '@user/User';

describe('TripService', () => {

  function createTripServiceWithLoggedUser(user: Nullable<User>): TripService {
    const service = new TripServiceUnderTest(new MockTripRepository());
    service.givenLoggedUser(user);
    return service;
  }

  function createTripServiceWithoutLoggedUser(): TripService {
    return createTripServiceWithLoggedUser(null);
  }

  function createTripServiceWithRandomLoggedUser(): TripService {
    return createTripServiceWithLoggedUser(new User());
  }

  function createTripServiceWithLoggedUserBeingFriendOf(user: User): TripService {
    const loggedUser = new User();
    user.addFriend(loggedUser);
    return createTripServiceWithLoggedUser(loggedUser);
  }

  describe('getTripsByUser', () => {

    it('should throw UserNotLoggedInError when use is not logged in', () => {
      const service = createTripServiceWithoutLoggedUser();

      const getTripsByUser = () => service.getTripsByUser(new User());

      expect(getTripsByUser).toThrowError(UserNotLoggedInError);
    });

    it('should return empty trips when logged user is not friend of given user', () => {
      const user = new User();
      user.addTrip(new Trip());

      const service = createTripServiceWithRandomLoggedUser();

      const trips = service.getTripsByUser(user);

      expect(trips).toHaveLength(0);
    });

    it('should return trips when logged user is friend of given user', () => {
      const user = new User();
      const trips = [new Trip(), new Trip()];
      trips.forEach(t => user.addTrip(t));

      const service = createTripServiceWithLoggedUserBeingFriendOf(user);

      const gotTrips = service.getTripsByUser(user);

      expect(gotTrips).toEqual(trips);
    });

    it('should return trips ordered by popularity in decending order', () => {
      const user = new User();
      const trips = [
        new Trip(1),
        new Trip(2),
        new Trip(3),
      ];
      trips.forEach(t => user.addTrip(t));

      const service = createTripServiceWithLoggedUserBeingFriendOf(user);

      const gotTrips = service.getTripsByUser(user);

      expect(gotTrips).toEqual([
        new Trip(3),
        new Trip(2),
        new Trip(1),
      ]);
    });

    it('should log welcome message when getTripsByUser is called', () => {
      const logger = new MockLogger();

      const service = createTripServiceWithRandomLoggedUser();
      service.setLogger(logger);

      service.getTripsByUser(new User());

      const message = logger.getMessage().toLowerCase();

      expect(message).toContain('welcome');
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

  protected findTripsByUser(user: User): Trip[] {
    return user.getTrips();
  }
}

class MockLogger implements Logger {
  private message: string = '';

  public log(message: string): void {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }
}

class MockTripRepository implements TripRepository {
  public findTripsByUser(user: User): Trip[] {
    return user.getTrips();
  }
}
