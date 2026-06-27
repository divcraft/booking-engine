import { ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '#core/database';
import { HealthService } from './health.service';

jest.mock('#core/database', () => ({
  DatabaseService: class DatabaseService {},
}));

describe('HealthService', () => {
  let service: HealthService;
  let queryRawMock: jest.Mock;

  beforeEach(async () => {
    queryRawMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: DatabaseService,
          useValue: {
            $queryRaw: queryRawMock,
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('live', () => {
    it('should return live health status', () => {
      const result = service.live();

      expect(result).toMatchObject({
        status: 'ok',
        service: 'booking-engine',
      });

      expect(new Date(result.timestamp).toString()).not.toBe('Invalid Date');
    });
  });

  describe('ready', () => {
    it('should return ready health status when database is available', async () => {
      queryRawMock.mockResolvedValue([{ '?column?': 1 }]);

      const result = await service.ready();

      expect(queryRawMock).toHaveBeenCalledTimes(1);

      expect(result).toMatchObject({
        status: 'ok',
        dependencies: {
          database: 'ok',
        },
      });

      expect(new Date(result.timestamp).toString()).not.toBe('Invalid Date');
    });

    it('should throw ServiceUnavailableException when database query fails', async () => {
      queryRawMock.mockRejectedValue(new Error('Database unavailable'));

      await expect(service.ready()).rejects.toBeInstanceOf(ServiceUnavailableException);

      expect(queryRawMock).toHaveBeenCalledTimes(1);
    });
  });
});
