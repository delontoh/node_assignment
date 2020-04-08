let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');

chai.use(chaiHttp);

/**
 * Assert style
 */
chai.should();

describe('*** Student Status API ***', () => [
    /**
     * Test POST route
     */
    describe('POST /suspend', () => {
        it("Test body request without teacher param >>> It should give status: 500", (done) => {
            const body = {};
            chai.request(app)
                .post('/suspend')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request without student param >>> It should give status: 500", (done) => {
            const body = {
                teacher: "teacherken@example.com",
            };
            chai.request(app)
                .post('/suspend')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request with empty student email>>> It should give status: 500", (done) => {
            const body = {
                student: "",
            };
            chai.request(app)
                .post('/suspend')
                .send(body)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })

        });
        it("Test body request with student email >>> It should give status: 204", (done) => {
            const body = {
                student: "studentrebecca@example.com"
            };
            chai.request(app)
                .post('/suspend')
                .send(body)
                .end((err, response) => {
                    response.status.should.eql(204);
                    done();
                })

        });
    })
]);
