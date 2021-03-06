import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User} from "./entities/user.entity";
import {UserSchema} from "./user.model";
import {JwtStrategy} from "../login/jwt.strategy";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule {
}
