const {
  app,
  request,
  chai: { expect },
} = require('../utils');

module.exports = function () {
  // Test valid login user
  it('POST /v1/auth/login - should return a payload', function (done) {
    request(app)
      .post('/v1/auth/login')
      .send({ email: 'john.doe@example.com', password: 'JohnDoe@2022' })
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.property('payload');
        global.token = res.body.payload;
        global.refreshToken = res.headers['set-cookie'][0]
          .split(',')
          .map((item) => item.split(';')[0])
          .join(';');

        done();
      });
  });
  // Test invalid login user
  it('POST /v1/auth/login - should return a error', function (done) {
    request(app)
      .post('/v1/auth/login')
      .send({ email: 'invalid@email.com', password: 'InvalidPassword' })
      .expect(401)
      .end(function (err, res) {
        expect(res.body).to.have.property('error');
        done();
      });
  });
};
