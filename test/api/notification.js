let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');

chai.use(chaiHttp);

/**
 * Assert style
 */
chai.should();

describe('*** Notification API ***', () => [
    /**
     * Test POST route
     */
    describe('POST /api/retrievefornotifications', () => {
        it("Test body request without teacher param >>> It should give status: 500", (done) => {
            const body = {
                notification: "Hello students! @studentagnes@example.com @studentmiche@example.com"
            };
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request without notification param >>> It should give status: 500", (done) => {
            const body = {
                teacher: "teacherdelontoh@example.com",
            };
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request with teacher and notification params with mentions >>> It should give status: 200", (done) => {
            const body = {
                teacher: "teacherdelontoh@gmail.com",
                notification: "Hello students! @studentsilverash@example.com @studentrebeccae@example.com"
            };
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(200);
                    response.body.data.should.be.an('object');
                    response.body.data.should.have.property('recipients');
                    done();
                })

        });
        it("Test body request with teacher and notification params without mentions >>> It should give status: 200", (done) => {
            const body = {
                teacher: "teacherdelontoh@gmail.com",
                notification: "Hello students!"
            };
            chai.request(app)
                .post('/api/retrievefornotifications')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(200);
                    response.body.data.should.be.an('object');
                    response.body.data.should.have.property('recipients');
                    done();
                })

        });
    })
]);
