const request = require('supertest');
import express from 'express';

describe('User API', () => {
  let userId = 1;

  // Test for creating a new user
  it('should create a new user', async () => {
    const res = await request(express)
      .post('/api/users')
      .send({
        displayName: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  // Test for fetching all users
  it('should fetch all users', async () => {
    const res = await request(express).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for fetching a user by ID
  it('should fetch a user by ID', async () => {
    const res = await request(express).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  // Test for updating a user by ID
  it('should update a user by ID', async () => {
    const res = await request(express)
      .put(`/api/users/${userId}`)
      .send({
        displayName: 'Updated User'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('displayName', 'Updated User');
  });

  // Test for deleting a user by ID
  it('should delete a user by ID', async () => {
    const res = await request(express).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);
  });
});
