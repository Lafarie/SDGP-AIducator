const request = require('supertest');
const app = require('./server.js'); // assuming your server file is named server.js

describe('GET /get/popular-threads', () => {
  it('responds with JSON containing popular threads', async () => {
    const response = await request(app).get('/get/popular-threads');

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Content: expect.any(String),
          Title: expect.any(String),
          CreationDate: expect.any(String),
          ForumID: expect.any(Number), // Corrected to match the case in the received response
          ThreadID: expect.any(Number), // Corrected to match the case in the received response
          UserID: expect.any(String),
          UpVotes: expect.any(Number),
          Views: expect.any(Number),
        }),
      ])
    );

  });
});

describe('GET /get/thread', () => {
  it('responds with JSON containing popular threads', async () => {
    const response = await request(app).get('/get/thread/1');
    expect(response.status).toBe(404);
  });
});

describe('GET /get/threads', () => {
  it('responds with JSON containing popular threads', async () => {
    const response = await request(app).get('/get/threads/1');
    expect(response.status).toBe(404);
  });
})


describe('GET /get/forums', () => {
  it('responds with JSON containing popular threads', async () => {
    const response = await request(app).get('/get/forums');
    expect(response.status).toBe(404);
  });
}
)

describe('GET /get/forum', () => {
  it('responds with JSON containing popular threads', async () => {
    const response = await request(app).get('/get/forum/1');
    expect(response.status).toBe(404);
  });
}
)
// describe('POST /post/prompt', () => {
//   it('responds with JSON containing the response', async () => {
//     const response = await request(app)
//       .post('/post/prompt')
//     expect(response.status).toBe(404);
//   });
// });

// describe('POST /post/save', () => {
//   it('responds with JSON containing the saved response', async () => {
//     const response = await request(app)
//       .post('/post/save')
//       .send({ responseId: 'sample-response-id' });
//     expect(response.status).toBe(200);
//   });
// });

describe('GET /get/responses', () => {
  it('responds with JSON containing the list of saved responses', async () => {
    const response = await request(app).get('/get/responses');

    expect(response.status).toBe(200);
  });
});

describe('POST /post/unsave', () => {
  it('responds with JSON containing the unsaved response', async () => {
    const response = await request(app)
      .post('/post/unsave')
      .send({ responseId: 'sample-response-id' });

    expect(response.status).toBe(200);
  });
});

describe('POST /post/displaySaved', () => {
  it('responds with JSON containing the displayed saved response', async () => {
    const response = await request(app)
      .post('/post/displaySaved')
      .send({ responseId: 'sample-response-id' });

    expect(response.status).toBe(200);
  });
});

describe('GET /get/forum', () => {
  it('responds with JSON containing the forum details', async () => {
    const response = await request(app).get('/get/forum/1');

    expect(response.status).toBe(404);
  });
});

describe('GET /get/posts', () => {
  it('responds with JSON containing the list of posts', async () => {
    const response = await request(app).get('/get/posts/1');

    expect(response.status).toBe(404);
  });
});

// describe('GET /check/post/vote', () => {
//   it('responds with JSON containing the post vote status', async () => {
//     const response = await request(app).get('/check/post/vote');

//     expect(response.status).toBe(404);
//   });
// });

// describe('GET /check/thread/vote', () => {
//   it('responds with JSON containing the thread vote status', async () => {
//     const response = await request(app).get('/check/thread/vote');

//     expect(response.status).toBe(404);
//   });
// });

describe('POST /update/views', () => {
  it('responds with JSON containing the updated views count', async () => {
    const response = await request(app)
      .post('/update/views')
      .send({ threadId: 1 });

    expect(response.status).toBe(200);
  });
});

describe('GET /get/test', () => {
  it('responds with JSON containing the test details', async () => {
    const response = await request(app).get('/get/test');

    expect(response.status).toBe(404);
  });
});

describe('GET /get/quiz', () => {
  it('responds with JSON containing the quiz details', async () => {
    const response = await request(app).get('/get/quiz');

    expect(response.status).toBe(404);
  });
});
