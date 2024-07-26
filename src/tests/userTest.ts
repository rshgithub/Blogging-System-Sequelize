import request from 'supertest';
import express from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

// Test data
const userPayload = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123'
};

const updatedUserPayload = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  password: 'newpassword123'
};

// Helper function to create a user for testing
const createUser = async (payload = userPayload) => {
  const response = await request(express).post('/api/users').send(payload);
  return response;
};

describe('User API Endpoints', () => {
  let userId: number;

  beforeAll(async () => {
    // Optionally, set up your database state here if needed
  });

  afterAll(async () => {
    // Clean up database or close connections here if needed
    await User.destroy({ where: {} });
  });

  it('should create a new user', async () => {
    const response = await createUser();
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  it('should get all users', async () => {
    const response = await request(express).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get user by ID', async () => {
    const response = await request(express).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('should update user by ID', async () => {
    const response = await request(express).put(`/api/users/${userId}`).send(updatedUserPayload);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedUserPayload.name);
  });

  it('should delete user by ID', async () => {
    const response = await request(express).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);

    // Verify user is deleted
    const checkResponse = await request(express).get(`/api/users/${userId}`);
    expect(checkResponse.status).toBe(404);
  });

  it('should get all posts by a specific user', async () => {
    // Create a post for the user
    const postResponse = await request(express).post('/api/posts').send({ userId, title: 'Test Post', content: 'This is a test post.' });
    expect(postResponse.status).toBe(201);

    // Fetch posts for the user
    const response = await request(express).get(`/api/users/${userId}/posts`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('title', 'Test Post');
  });

  it('should get all comments by a specific user', async () => {
    // Create a comment for the user
    const postResponse = await request(express).post('/api/posts').send({ userId, title: 'Another Post', content: 'This is another test post.' });
    expect(postResponse.status).toBe(201);

    const postId = postResponse.body.id;

    const commentResponse = await request(express).post(`/api/posts/${postId}/comments`).send({ userId, content: 'This is a comment.' });
    expect(commentResponse.status).toBe(201);

    // Fetch comments for the user
    const response = await request(express).get(`/api/users/${userId}/comments`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('content', 'This is a comment.');
  });
});
