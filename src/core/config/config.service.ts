import { ConfigService as NestConfigService } from '@nestjs/config';
import { ConfigType } from './config.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get(): ConfigType {
    return {
      app: this.configService.getOrThrow<ConfigType['app']>('app'),
      db: this.configService.getOrThrow<ConfigType['db']>('db'),
      auth: this.configService.getOrThrow<ConfigType['auth']>('auth'),
    };
  }
}
