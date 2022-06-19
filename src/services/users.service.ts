import bcrypt from 'bcrypt';
import { SignUpDto } from '../dtos';
import HttpException from '../exceptions/HttpException';
import { updateUser } from '../interfaces';
import { isEmpty, hashPassword } from '../utils';
import { User } from '../entities';
import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from '../utils/typeorm';
import { Like } from 'typeorm';

class UserService {
  public userEntity = User;
  public async findAllUser(keyword = ''): Promise<User[]> {
    const users: User[] = await this.userEntity.find({
      where: [
        { email: Like(`%${keyword}%`) },
        {
          firstName: Like(`%${keyword}%`),
        },
        {
          lastName: Like(`%${keyword}%`),
        },
      ],
    });
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await findEntityOrThrow(this.userEntity, userId);
    return findUser;
  }

  public async createUser(userData: SignUpDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Missing user info');

    const findUser = await this.userEntity.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData: User = await createEntity(this.userEntity, {
      ...userData,
      password: hashedPassword,
    });
    return createUserData;
  }

  public async updateUser(userId: string, userData: updateUser): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Missing user info');

    const updateUserById = updateEntity(this.userEntity, userId, userData);

    if (!updateUserById) throw new HttpException(409, 'Can not update user info');

    return updateUserById;
  }

  public async deleteUserData(userId: string): Promise<User> {
    // const deleteUserById: User = await this.users.findByIdAndUpdate(userId, { deleteFlag: true });
    const deleteUserById: User = await deleteEntity(this.userEntity, userId);
    if (!deleteUserById) throw new HttpException(409, `User is deleted or not existed`);
    return deleteUserById;
  }

  public async changePassword(userId: string, password: string): Promise<User> {
    const changePassword = {
      password: await hashPassword(password),
    };

    const changePasswordById = await updateEntity(this.userEntity, userId, changePassword);
    return changePasswordById;
  }
}

export default UserService;
