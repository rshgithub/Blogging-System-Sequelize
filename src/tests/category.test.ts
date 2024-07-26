const request = require('supertest');
import express from 'express';

describe('Category API', () => {
  let categoryId = 1;

  // Test for creating a new category
  it('should create a new category', async () => {
    const res = await request(express)
      .post('/api/categories')
      .send({
        name: 'Test Category'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    categoryId = res.body.id;
  });

  // Test for fetching all categories
  it('should fetch all categories', async () => {
    const res = await request(express).get('/api/categories');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for fetching a category by ID
  it('should fetch a category by ID', async () => {
    const res = await request(express).get(`/api/categories/${categoryId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', categoryId);
  });

  // Test for fetching all posts by category name
  it('should fetch all posts by category name', async () => {
    const res = await request(express)
      .get(`/api/categories/${categoryId}/posts`)
      .send({
        name: 'Test Category'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test for updating a category by ID
  it('should update a category by ID', async () => {
    const res = await request(express)
      .put(`/api/categories/${categoryId}`)
      .send({
        name: 'Updated Category'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Category');
  });

  // Test for deleting a category by ID
  it('should delete a category by ID', async () => {
    const res = await request(express).delete(`/api/categories/${categoryId}`);
    expect(res.statusCode).toEqual(204);
  });
});
