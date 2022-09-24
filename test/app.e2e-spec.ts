import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create User/ (POST)', async () => {
    let createuser = {
      first_name: 'Mardonis',
      email: 'mardonis.bezerra@gmail.com',
      last_name: 'Alves B',
      phone: '85992590075'
    }
    return await request(app.getHttpServer())
      .post('/api/v1/create/user')
      .send(createuser)
      .then((res) => {
        if (res.body.message === 'Usuario cadastrado com sucesso') {
          expect(res.statusCode).toEqual(201);
          expect(res.body).toEqual({ message: 'Usuario cadastrado com sucesso' });
        } else {
          expect(res.statusCode).toEqual(201);
          expect(res.body).toEqual({ message: 'Usuario ja cadastrado' });
        }
      })
  });

  it('Update User', async () => {
    let updateuser = {
      first_name:'Mardonis',
      email:'mardonisalesgpupdate@gmail.com',
      last_name:'Alves B',
      phone:'85992590075'
    }
    return await request(app.getHttpServer())
      .put('/api/v1/update/user/d092e715-c0f3-42a1-9f6e-3984246d1794')
      .send(updateuser)
      .then((res) => {
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({ message:'Usuario atualizado com sucesso!'})
      })
  })

  it('All Users' ,async () =>{
    let allUser = [{
      first_name: 'Mardonis',
      email: 'mardonis.bezerra@gmail.com',
      last_name: 'Alves B',
      phone: '85992590075',
      user_id: '62d67836-4339-43df-af29-b2160f11f9a9',
    }]
    return await request(app.getHttpServer())
    .get('/api/v1/all/users')
    .then((res) => {
      expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expect.arrayContaining(allUser))
    })
  })

  it('delete User', async () => {
    return await request(app.getHttpServer())
    .delete('/api/v1/delete/user/df992d9b-2c4d-4ad3-817b-06963891c6ae')
    .then((res) => {
      if(res.body.message === 'Usuario deletado com sucesso'){
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({message:'Usuario deletado com sucesso'})
      }else{
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({message: 'Usuario não encontrado'})  
      }
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
