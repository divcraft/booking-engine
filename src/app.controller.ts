import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '#core/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.config.get());
    return this.appService.getHello();
  }
}
