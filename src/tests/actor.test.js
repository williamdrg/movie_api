const request = require('supertest');
const app = require('../app');

const actor = {
  firstName: "Leonardo",
  lastName: "DiCaprio",
  nationality: "American",
  image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT7cOVRwz9nSmJPRgUbDR1gnGC3Eju0y_2HwH_71Czh_nA6eSpG",
  birthday: "1974-11-11"
}

const BASE_URL = '/api/v1/actors'

let actorId

test("POST -> '/actors', BASE_URL should return statusCode 201, and res.body.firstName === actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor)

  actorId = res.body.id
  
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> '/actors', BASE_URL should return statusCode 200, and res.body.length should be greater than 0", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBeGreaterThan(0)
})

test('PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName == actorUpdate.firstName', async () => {
  
  const actorUpdate = {
    firstName: "Leonardo Updated",
    lastName: "DiCaprio",
    nationality: "American",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT7cOVRwz9nSmJPRgUbDR1gnGC3Eju0y_2HwH_71Czh_nA6eSpG",
    birthday: "1974-11-11"
  }
  
  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)

})

test('DELETE -> BASE_URL/actorId, should return statusCode 204', async () => {
  
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)
    
  expect(res.statusCode).toBe(204)
})
