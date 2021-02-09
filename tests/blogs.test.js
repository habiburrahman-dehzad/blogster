const mongoose = require('mongoose');
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When logged in', () => {
  beforeEach(async () => {
    await page.login('http://localhost:3000/blogs');
    await page.click('.fixed-action-btn a.btn-floating');
  });

  test('Can see blog creation form', async () => {
    const text = await page.getContentsOf('form .title label');

    expect(text).toEqual('Blog Title');
  });

  describe('And using valid inputs', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My Test Title');
      await page.type('.content textarea', 'My test content');
      await page.click('form button');
    });

    test('Submitting takes user to review screen', async () => {
      const text = await page.getContentsOf('form h5');

      expect(text).toEqual('Please confirm your entries');
    });

    test('Submitting then saving adds the blog to index page', async () => {
      await page.click('button.green');
      await page.waitForSelector('.card');

      const title = await page.getContentsOf('.card-title');
      const content = await page.getContentsOf('p');

      expect(title).toEqual('My Test Title');
      expect(content).toEqual('My test content');
    });
  });

  describe('And using invalid inputs', () => {
    beforeEach(async () => {
      await page.click('form button');
    });

    test('the form shows an error message', async () => {
      const titleError = await page.getContentsOf('.title .red-text');
      const contentError = await page.getContentsOf('.content .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});

describe('User is not logged in', () => {
  const actions = [
    {
      method: 'get',
      path: '/api/blogs',
    },
    {
      method: 'post',
      path: '/api/blogs',
      data: {
        title: 'My Title',
        content: 'My Content',
      },
    },
  ];

  test('Blog related actions are forbiden', async () => {
    const results = await page.execRequests(actions);

    for (const result of results) {
      expect(result).toEqual({
        error: 'You are not authorized. You must login.',
      });
    }
  });
});
