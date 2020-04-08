let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');

chai.use(chaiHttp);

/**
 * Assert style
 */
chai.should();

describe('*** Register API ***', () => [
    /**
     * Test POST route
     */
    describe('POST /register', () => {
        it("Test with empty body request >>> It should give status: 500", (done) => {
            const body = {};
            chai.request(app)
                .post('/register')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request without teacher param >>> It should give status: 500", (done) => {
            const body = {
                students: ["studentjon@example.com", "studenthon@example.com" ]
            };
            chai.request(app)
                .post('/register')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request without notification param >>> It should give status: 500", (done) => {
            const body = {
                teacher: "teacherken@gmail.com",
            };
            chai.request(app)
                .post('/register')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })
        });
        it("Test body request with correct params >>> It should give status: 204", (done) => {
            const body = {
                teacher: "teacherken@gmail.com",
                students: ["studentjon@example.com", "studenthon@example.com" ]
            };
            chai.request(app)
                .post('/register')
                .send(body)
                .end((err, response) => {
                    response.status.should.eql(204);
                    done();
                })
        });
    })
])
