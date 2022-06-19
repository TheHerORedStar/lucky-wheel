import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginDto, SignUpDto } from '../dtos';
import { User } from '../entities';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces';
import { isEmpty } from '../utils';
import { createEntity } from '../utils/typeorm';

class AuthService {
  public userEntity = User;

  public async signup(userData: SignUpDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Missing user info');

    const findUser = await this.userEntity.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `User with email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData: User = await createEntity(this.userEntity, {
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(userData: LoginDto): Promise<{ token: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Missing email or password');
    const findUser: User = await this.userEntity.findOne({
      where: {
        email: userData.email,
        deleteFlag: false,
      },
    });

    if (!findUser) throw new HttpException(409, `Email ${userData.email} is not found`);

    if (findUser.isActive == false) {
      throw new HttpException(409, `Your email ${userData.email} is disabled`);
    }

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Your email or password is incorrect');

    //save token
    const { token } = this.createToken(findUser);

    return { token, findUser: findUser };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60 * 24 * 7;
    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public createInitiateApplication = async () => {
    const { ADMIN_DEFAULT, ADMIN_DEFAULT_PWD } = process.env;

    const checkUserEmailExists = await this.userEntity.findOne({ email: ADMIN_DEFAULT });

    if (checkUserEmailExists) {
      return;
    }
    const hashedPassword = await bcrypt.hash(ADMIN_DEFAULT_PWD, 10);
    const userData = {
      email: ADMIN_DEFAULT,
      password: hashedPassword,
      firstName: '',
      lastName: '',
    };

    await createEntity(this.userEntity, userData);
  };
}

export default AuthService;
