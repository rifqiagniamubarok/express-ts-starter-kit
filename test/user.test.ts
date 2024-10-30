import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { UserTest } from './test-utils';

describe('POST /api/users', () => {
  afterAll(async () => {
    await UserTest.delete();
  });
  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(web).post('/v1/api/auth/register').send({
      name: '',
      email: '',
      password: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should register new user', async () => {
    const response = await supertest(web).post('/v1/api/auth/register').send({
      name: 'test',
      email: 'test@yopmail.com',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe('test@yopmail.com');
    expect(response.body.data.name).toBe('test');
  });

  it('should reject login user if request is invalid', async () => {
    const response = await supertest(web).post('/v1/api/auth/login').send({
      email: '',
      password: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should login user', async () => {
    const response = await supertest(web).post('/v1/api/auth/login').send({
      email: 'test@yopmail.com',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('test');
    expect(response.body.data.email).toBe('test@yopmail.com');
    expect(response.body.data.token).toBeDefined();
  });

  it('should fail login user because already exist', async () => {
    const response = await supertest(web).post('/v1/api/auth/register').send({
      email: 'test@yopmail.com',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
