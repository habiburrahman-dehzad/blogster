const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];

    const customePage = new CustomPage(page);

    return new Proxy(customePage, {
      get: function (target, property) {
        return customePage[property] || page[property] || browser[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login(redirectUrl = 'localhost:3000') {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await this.page.setCookie(
      { name: 'express:sess', value: session },
      { name: 'express:sess.sig', value: sig }
    );

    await this.page.goto(redirectUrl);
    await this.page.waitForSelector('a[href="/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(_data),
        }).then((res) => res.json());
      },
      path,
      data
    );
  }

  get(path) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    }, path);
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }
}

module.exports = CustomPage;
