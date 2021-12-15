import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user-model';

@Pipe({ name: 'findUserById' })
export class FindUserByIdPipe implements PipeTransform {
  transform(users: UserModel[], userId: number): UserModel {
    if (users == null) {
      return null;
    }
    return users.find((user) => user.id == userId);
  }
}
