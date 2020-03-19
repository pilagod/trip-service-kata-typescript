import { CollaboratorCallError } from '@error';
import User from '@user/User';
import Trip from '@trip/Trip';

export default class TripDAO {
  public static findTripsByUser(user: User): Trip[] {
    throw new CollaboratorCallError('TripDAO should not be invoked on an unit test.');
  }
}
