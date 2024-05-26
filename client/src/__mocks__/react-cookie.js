class Cookies {
  constructor() {
    this.cookies = { 'myCookie': { _id: 'mockedUserId' } };
  }

  get(name) {
    return this.cookies[name];
  }

  set(name, value, options) {
    this.cookies[name] = value;
  }

  remove(name) {
    delete this.cookies[name];
  }
}

module.exports = {
  Cookies,
};