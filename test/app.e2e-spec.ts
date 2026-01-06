import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import superTest from 'supertest';
import { AppModule } from '../src/interfaces/modules/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const testRequest = superTest(app.getHttpServer());
    return testRequest.get('/').expect(200).expect('Hello World!');
  });
});
