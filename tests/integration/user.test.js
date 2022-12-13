const {
  app,
  request,
  chai: { expect },
} = require('../utils');

const userTest = {
  firstName: 'william',
  lastName: 'francis',
  email: 'will.franc@gmail.com',
  password: 'JohnDoe@2022',
  roleId: 2,
};

const updatedEmail = 'william.francis@gmail.com';

module.exports = function () {
  // Test valid login user
  it('GET /v1/user - should return users as array', function (done) {
    request(app)
      .get('/v1/user')
      .set('Authorization', `Bearer ${global.token}`)
      .send()
      .expect(200)
      .end(function (err, res) {
        if (err) console.log(err);

        expect(res.body).to.have.property('payload');
        expect(res.body).to.have.property('count');
        expect(res.body.payload).to.be.a('array');

        done();
      });
  });
  // Create user
  it('POST /v1/user - should create a user', function (done) {
    request(app)
      .post('/v1/user')
      .set('Authorization', `Bearer ${global.token}`)
      .send(userTest)
      .end(function (err, res) {
        if (err) console.log(err);

        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.have.property('userId');
        global.user = res.body.payload;

        done();
      });
  });
  // Change Password
  //   it('POST /v1/update-password - should change password of user', function (done) {
  //     request(app)
  //       .post('/v1/user/update-password')
  //       .set('Authorization', `Bearer ${global.token}`)
  //       .send({
  //         oldPassword: userTest.password,
  //         newPassword: 'JohnDoe!2022',
  //       })
  //       .end(function (err, res) {
  //         if (err) console.log(err);

  //         expect(res.body).to.have.property('payload');
  //         expect(res.body.payload).to.equal(true);

  //         done();
  //       });
  //   });
  // Update user
  it('PUT /v1/user/:userId - should update email of user', function (done) {
    const { firstName, lastName, roleId, userId } = global.user;
    request(app)
      .put(`/v1/user/${userId}`)
      .set('Authorization', `Bearer ${global.token}`)
      .send({ firstName, lastName, roleId, email: updatedEmail })
      .end(function (err, res) {
        if (err) console.log(err);

        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.have.property('userId');
        expect(res.body.payload.userId).to.equal(userId);
        expect(res.body.payload.email).to.equal(updatedEmail);

        done();
      });
  });
  // Switch status
  it('POST /v1/user/switch-status/:userId - should toggle status of user', function (done) {
    const { userId } = global.user;
    request(app)
      .post(`/v1/user/switch-status/${userId}`)
      .set('Authorization', `Bearer ${global.token}`)
      .send()
      .end(function (err, res) {
        if (err) console.log(err);

        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.have.property('statusId');
        expect(res.body.payload.statusId).to.equal(0);

        done();
      });
  });
  // Delete User
  it('DELETE /v1/user - should delete user', function (done) {
    request(app)
      .delete(`/v1/user`)
      .set('Authorization', `Bearer ${global.token}`)
      .send({ userId: [global.user.userId] })
      .end(function (err, res) {
        if (err) console.log(err);

        expect(res.body).to.have.property('payload');
        expect(res.body.payload).to.equal(1);

        done();
      });
  });
};
