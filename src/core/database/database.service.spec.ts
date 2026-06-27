import { DatabaseService } from './database.service';

const connectMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock('./generated/client', () => ({
  PrismaClient: class {
    $connect = connectMock;
    $disconnect = disconnectMock;
  },
}));

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn(),
}));

describe('DatabaseService', () => {
  const service = new DatabaseService({
    get: () => ({
      db: {
        databaseUrl: 'postgresql://localhost/test',
      },
    }),
  } as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('connects on module init', async () => {
    await service.onModuleInit();

    expect(connectMock).toHaveBeenCalledTimes(1);
  });

  it('disconnects on module destroy', async () => {
    await service.onModuleDestroy();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
