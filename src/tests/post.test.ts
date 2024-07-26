const request = require('supertest');
import express from 'express';

describe('Post API', () => {
  let postId = 1;

  // Test for creating a new post
  it('should create a new post', async () => {
    const res = await request(express)
      .post('/api/posts')
      .send({
        title: 'Test Post',
        content: 'This is a test post.',
        userId: 1 // Adjust according to your user data
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    postId = res.body.id;
  });

  // Test for fetching all posts with associations
  it('should fetch all posts with associations', async () => {
    const res = await request(express).get('/api/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for fetching a post by ID with associations
  it('should fetch a post by ID with associations', async () => {
    const res = await request(express).get(`/api/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', postId);
  });

  // Test for updating a post by ID
  it('should update a post by ID', async () => {
    const res = await request(express)
      .put(`/api/posts/${postId}`)
      .send({
        title: 'Updated Post',
        content: 'This is an updated post.'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Post');
  });

  // Test for deleting a post by ID
  it('should delete a post by ID', async () => {
    const res = await request(express).delete(`/api/posts/${postId}`);
    expect(res.statusCode).toEqual(204);
  });

  // Test for fetching categories for a specific post
  it('should fetch categories for a specific post', async () => {
    const res = await request(express).get(`/api/posts/${postId}/categories`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for creating a new comment for a post
  it('should create a new comment for a post', async () => {
    const res = await request(express)
      .post(`/api/posts/${postId}/comments`)
      .send({
        content: 'This is a comment.',
        userId: 1 // Adjust according to your user data
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // Test for fetching comments for a specific post
  it('should fetch comments for a specific post', async () => {
    const res = await request(express).get(`/api/posts/${postId}/comments`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
