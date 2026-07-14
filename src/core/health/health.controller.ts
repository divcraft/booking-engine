import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthLiveOutputDto, HealthReadyOutputDto } from './health.models';
import { OpenApiOkResponse, OpenApiApplicationNotReady } from '#core/openapi';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  @OpenApiOkResponse({
    type: HealthLiveOutputDto,
    description: 'Application is live',
  })
  getLive(): HealthLiveOutputDto {
    return this.healthService.live();
  }

  @Get('ready')
  @OpenApiOkResponse({
    type: HealthReadyOutputDto,
    description: 'Application is ready',
  })
  @OpenApiApplicationNotReady()
  async getReady(): Promise<HealthReadyOutputDto> {
    return this.healthService.ready();
  }
}
