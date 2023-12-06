const request = require('supertest');
const app = require('../index.js'); // Assuming this is the correct path to your app entry point
NODE_ENV='test'

jest.mock('../app/models/expense');
jest.mock('../app/models/budget');

let authToken; // Variable to store the authentication token

describe('Dashboard Controller', () => {
  beforeAll(async () => {
    // Simulate authentication and obtain a token
    const loginResponse = await request(app)
      .post('/v1/auth/login')
      .send({
        username: 'vikasraria14',
        password: 'Raria@123',
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
    authToken = loginResponse.body.token; // Store the token for later use
  });

  it('should return budget vs expenses data', async () => {
    // Check if authToken is defined
    if (!authToken) {
      throw new Error('Authentication token is not defined. Make sure to run the authentication test first.');
    }

    const expenseMockData = [
      {
        _id: '6568e283b8bdfbff22eecf59',
        description: 'Computer Made Easy',
        category: 'books',
        amount: 23456,
        month: 12,
        year: 2023,
        __v: 0,
      },
    ];

    const budgetMockData = [
      {
        _id: '6568e28db8bdfbff22eecf5e',
        category: 'books',
        amount: 4567,
        __v: 0,
      },
      // Add more budget mock data as needed
    ];

    // Mock the aggregate and find functions of the expense and budget models
    require('../app/models/expense').find.mockResolvedValue(expenseMockData);
    require('../app/models/budget').find.mockResolvedValue(budgetMockData);

    const response = await request(app)
      .get('/v1/dashboard/budgetVSExpenses?month=12&year=2023')
      .set('x-auth-token', `${authToken}`); // Include the authentication token

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          category: expect.any(String),
          budget: expect.any(Number),
          expense: expect.any(Number),
        },
      ])
    );
  });
});