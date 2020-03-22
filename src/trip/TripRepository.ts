import Trip from '@trip/Trip';
import User from '@user/User';

export default interface TripRepository {
  findTripsByUser(user: User): Trip[];
}
