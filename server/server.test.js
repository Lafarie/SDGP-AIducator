// Import necessary modules and functions
const handleVoteCheck = require('./server.js');
const dbconnection = require('./test/dbconnection.js'); // Assuming this is how you import your database connection module
const { mockRequest, mockResponse } = require('jest-mock-req-res');

// Mocking the database connection module
jest.mock('./dbconnection');

describe('handleVoteCheck function', () => {
  // Test case for successful vote update
  test('handles successful vote update', async () => {
    // Mock request and response objects
    const req = mockRequest({
      query: { threadId: '1', userId: 'user1', voteType: 'upvote' }
    });
    const res = mockResponse();

    // Mock database query results
    dbconnection.query.mockImplementationOnce((query, callback) => {
      callback(null, [{ /* existing vote data */ }]);
    });

    // Call the function
    await handleVoteCheck(req, res);

    // Check if the response is as expected
    expect(res.json).toHaveBeenCalledWith({ message: 'successful' });
  });

  // Test case for successful new vote insertion
  test('handles successful new vote insertion', async () => {
    // Mock request and response objects
    const req = mockRequest({
      query: { threadId: '2', userId: 'user2', voteType: 'downvote' }
    });
    const res = mockResponse();

    // Mock database query results
    dbconnection.query.mockImplementationOnce((query, callback) => {
      callback(null, []); // Simulating no existing vote data
    });

    // Call the function
    await handleVoteCheck(req, res);

    // Check if the response is as expected
    expect(res.json).toHaveBeenCalledWith({ message: 'successful' });
  });

  // Test case for handling database query error
  test('handles database query error', async () => {
    // Mock request and response objects
    const req = mockRequest({
      query: { threadId: '3', userId: 'user3', voteType: 'upvote' }
    });
    const res = mockResponse();

    // Mock database query to simulate an error
    dbconnection.query.mockImplementationOnce((query, callback) => {
      callback(new Error('Database query error'));
    });

    // Call the function
    await handleVoteCheck(req, res);

    // Check if the response is as expected
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
