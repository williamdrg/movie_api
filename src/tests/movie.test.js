require('../models')
const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

const BASE_URL = '/api/v1/movies';
let movieId;

const movie = {
  name: "Inception",
  image: "https://play-lh.googleusercontent.com/buKf27Hxendp3tLNpNtP3E-amP0o4yYV-SGKyS2u-Y3GdGRTyfNCIT5WAVs2OudOz6so5K1jtYdAUKI9nw8",
  synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  releaseYear: 2010
};

test("POST -> BASE_URL, should return statusCode 201, and res.body.name === movie.name", async() => {
  const res = await request(app)
    .post(BASE_URL)
    .send(movie)
  
  movieId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length > 0", async() => {
  const res = await request(app)
    .get(BASE_URL)
  
  console.log('resultado', res.body)
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBeGreaterThan(0)
  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].genres).toBeDefined()
});

test("PUT -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movieUpdate.name", async() => {
  const movieUpdate = {
    name: "Inception Updated",
    image: "https://play-lh.googleusercontent.com/buKf27Hxendp3tLNpNtP3E-amP0o4yYV-SGKyS2u-Y3GdGRTyfNCIT5WAVs2OudOz6so5K1jtYdAUKI9nw8",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    releaseYear: 2010
  };
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
});

test('POST -> BASE_URL/:id/actors, should return statusCode 200, and res.body.length === 1', async () => {

  const actor = {
    firstName: "Leonardo",
    lastName: "DiCaprio",
    nationality: "American",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT7cOVRwz9nSmJPRgUbDR1gnGC3Eju0y_2HwH_71Czh_nA6eSpG",
    birthday: "1974-11-11"
  };

  const createActor = await Actor.create(actor)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActor.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createActor.id)

  await createActor.destroy()
});

test('POST -> BASE_URL/:id/directors, should return statusCode 200, and res.body.length === 1', async () => {

  const director = {
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "American",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT41qmFqCMjni03Iud3U9M0u26f1h5lnikUtm5FEM5mLTsKfOOH",
    birthday: "1946-12-18"
  };

  const createDirector = await Director.create(director)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirector.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createDirector.id)

  await createDirector.destroy()
});

test('POST -> BASE_URL/:id/genres, should return statusCode 200, and res.body.length === 1', async () => {

  const genre = {
    name: "Action"
  };

  const createGenre = await Genre.create(genre)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenre.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createGenre.id)

  await createGenre.destroy()
});

test("DELETE -> BASE_URL/movieId, should return statusCode 204", async() => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)
  
  console.log('delete', res.body)
  expect(res.statusCode).toBe(204)
});
