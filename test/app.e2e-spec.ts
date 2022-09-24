import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createuser = {
    first_name:'Mardonis',
    email:'mardonisalesgp@gmail.com',
    last_name:'Alves B',
    phone:'85992590075'
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create User/ (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/api/v1/create/user')
      .send(createuser)
      .then((res) =>{
        if(res.body.message === 'Usuario cadastrado com sucesso'){
          expect(res.statusCode).toEqual(201);
          expect(res.body).toEqual({message:'Usuario cadastrado com sucesso'});
        }else{
          expect(res.statusCode).toEqual(201);
          expect(res.body).toEqual({message:'Usuario ja cadastrado'}); 
        }
      })
      
    });
    
  afterAll(async () => {
    await app.close();
  });
});
