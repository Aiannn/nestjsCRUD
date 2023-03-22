import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(name: string, age: number, surname: string, email: string) {
    const id = uuidv4()
    const newUser = new User(id, name, age, surname, email);
    this.users.push(newUser)
    return id
    // create a new user and assign an id from uuid library 
    //to check if new user was created
  }

  findAll() {
    return [...this.users];
  }

  findOne(id: string) {
    return this.users.find((u) => u.id === id)
  }

  update(id: string, name: string, age: number, surname: string, email: string) {
    const [targetUser, index] = this.getUserById(id)
    const newUserParams = { ...targetUser, name, age, surname, email }
    const newUser = new User(id, newUserParams.name, newUserParams.age,
      newUserParams.surname, newUserParams.email)
    this.users[index] = newUser
    return newUser
  }

  remove(id: string) {
    const [_, index] = this.getUserById(id)
    this.users.splice(index, 1)
  }

  private getUserById(id: string): [User, number] {
    const index = this.users.findIndex((u) => u.id === id);
    return [this.users[index], index];
  }
}
