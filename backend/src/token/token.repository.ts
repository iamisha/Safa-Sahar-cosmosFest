// import { Repository } from 'typeorm';
// import { TokenBlacklist } from './entities/token.entity';
// import { CustomRepository } from 'src/modules/decorators/typeorm.decorator';

// @CustomRepository(TokenBlacklist)
// export class TokenRepository extends Repository<TokenBlacklist> {
//   async addToBlacklist(tokenIdentifier: string): Promise<TokenBlacklist> {
//     return await TokenBlacklist.create({ tokenIdentifier }).save();
//   }

//   async isTokenBlacklisted(tokenIdentifier: string): Promise<boolean> {
//     console.log('identifier is', tokenIdentifier);
//     const tokenBlacklist = await TokenBlacklist.findOne({
//       where: { tokenIdentifier: tokenIdentifier },
//     });
//     return !!tokenBlacklist;
//   }
// }
