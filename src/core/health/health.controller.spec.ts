import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthLiveResType, HealthReadyResType } from './health.schema';

jest.mock('./health.service', () => ({
  HealthService: class HealthService {},
}));

describe('HealthController', () => {
  let controller: HealthController;

  let liveMock: jest.MockedFunction<HealthService['live']>;
  let readyMock: jest.MockedFunction<HealthService['ready']>;

  beforeEach(async () => {
    liveMock = jest.fn();
    readyMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            live: liveMock,
            ready: readyMock,
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLive', () => {
    it('should return live health status', () => {
      const response: HealthLiveResType = {
        status: 'ok',
        service: 'booking-engine',
        timestamp: '2026-06-27T10:00:00.000Z',
      };

      liveMock.mockReturnValue(response);

      expect(controller.getLive()).toEqual(response);
      expect(liveMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReady', () => {
    it('should return ready health status', async () => {
      const response: HealthReadyResType = {
        status: 'ok',
        dependencies: {
          database: 'ok',
        },
        timestamp: '2026-06-27T10:00:00.000Z',
      };

      readyMock.mockResolvedValue(response);

      await expect(controller.getReady()).resolves.toEqual(response);
      expect(readyMock).toHaveBeenCalledTimes(1);
    });

    it('should propagate service errors', async () => {
      const error = new Error('Service unavailable');

      readyMock.mockRejectedValue(error);

      await expect(controller.getReady()).rejects.toThrow(error);
      expect(readyMock).toHaveBeenCalledTimes(1);
    });
  });
});
