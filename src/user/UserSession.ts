import { CollaboratorCallError } from '@error';
import User from '@user/User';

class UserSession {
  public getLoggedUser(): User {
    throw new CollaboratorCallError('UserSession.getLoggedUser() should not be called in an unit test');
  }
}

export default new UserSession();
