import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
// import {
//   CreateBookmarkDto,
//   EditBookmarkDto,
// } from '../src/bookmark/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';
// import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.com',
      password: 'test123',
    }
    describe('SignUp', () => {

      it('should throw error if email empty', () => {

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect()
      });

      it('should throw error if password empty', () => {

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect()
      });

      it('should throw error if no body provided', () => {

        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)
          .inspect()
      });

      it('should create a new user', () => {

        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
      });

    })

    describe('SignIn', () => {

      it('should throw error if email empty', () => {

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect()
      });

      it('should throw error if password empty', () => {

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
          .inspect()
      });

      it('should throw error if no body provided', () => {

        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400)
          .inspect()
      });

      it('should signed in the user and return a token', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('accessToken', 'access_token')
      });
    })

  })

  describe('User', () => {

    describe('Get Me', () => {

      it('should throw error if no token provided', () => { });

      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          .inspect()
      });

    })

    describe('Edit User', () => {
      const dto: EditUserDto = {
        firstName: "JokoGantiNama",
        email: "change@changeuser.com"
      }

      it('should edit current user', () => {

        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          // .expectBodyContains(dto.firstName)
          .inspect();
      });
    })

  })

  describe('Bookmark', () => {

    describe('Get Empty Bookmark', () => {
      it('should get empty bookmark', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          .expectBody([])
          .inspect();
      });
    })



    describe('Create Bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: "test",
        link: "https://test.com",
        description: "test description"
      }

      it('Should create a new bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });

    })

    describe('Get Bookmark', () => {

      it('should get bookmark', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          .expectJsonLength(1)
          .stores('bookmarkId', 'id')
          .inspect();
      });

    })

    describe('Get Bookmark by ID', () => {

      it('should get bookmark by ID', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          // .expectBodyContains('$S{bookmarkId}')
          .inspect();
      });

    })

    describe('Edit Bookmark', () => {
      const dto: EditBookmarkDto = {
        title: "test change title",
        link: "https://test-changed.com",
        description: "test description has been changed"
      }

      it('should edit bookmark by ID', () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .inspect();
      });
    })

    describe('Delete Bookmark', () => {

      it('should edit bookmark by ID', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(204)
          .inspect();
      });

      it('should get empty bookmark', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}'
          })
          .expectStatus(200)
          .expectJsonLength(0)
          .stores('bookmarkId', 'id')
          .inspect();
      });

    })
  });
})