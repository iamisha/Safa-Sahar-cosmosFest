import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import GraphQLJSON from 'graphql-type-json';
import { isNil } from 'lodash';
import { join } from 'path';
import { formatError } from 'src/modules/format/graphql-error.format';

@Injectable()
export class SettingService {
  constructor(private readonly configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);
    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get graphqlUseFactory(): Omit<ApolloDriverConfig, 'driver'> {
    return {
      resolvers: { JSON: GraphQLJSON },
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      sortSchema: true,
      playground: false,
      introspection: true,
      // ...(!this.isProduction && {
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // }),
      context: ({ req }) => ({ req }),
      cache: 'bounded',
      formatError,
    };
  }

  get typeOrmUseFactory():
    | TypeOrmModuleOptions
    | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres' as any,
      host: this.getString('POSTGRES_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('POSTGRES_USER'),
      password: this.getString('POSTGRES_PASSWORD'),
      database: this.getString('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: true,
        sslmode: 'require',
      },
      autoLoadEntities: true,
      logging: false, // if you want to see the query log, change it to true
      // timezone: '+09:00', // if you want to use timezone, change it to your timezone
    };
  }
}
