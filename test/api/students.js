let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');

chai.use(chaiHttp);

/**
 * Assert style
 */
chai.should();

describe('*** Students API ***', () => [
    /**
     * Test GET route
     */
    describe('GET /commonstudents', () => {
        it("Test with empty query request >>> It should give status: 500", (done) => {
            const query = {};
            chai.request(app)
                .get('/commonstudents')
                .query(query)
                .end((err, response) => {
                    response.body.should.have.status(500);
                    done();
                })

        });
        it("Test query without teacher param >>> It should give status: 500", (done) => {
            const query = {
                student: "studentrebecca@example.com",
            };
            chai.request(app)
                .get('/commonstudents')
                .query(query)
                .end((err, response) => {
                    response.body.should.have.status(500)
                    done();
                })
        });
        it("Test query with empty teacher email >>> It should give status: 500", (done) => {
            const query = {
                teacher: "",
            };
            chai.request(app)
                .get('/commonstudents')
                .query(query)
                .end((err, response) => {
                    response.body.should.have.status(500);
                    done();
                })
        });
        it("Test query with teacher email >>> It should give status: 200", (done) => {
            const query = {
                teacher: "teacherdelontoh@gmail.com",
            };
            chai.request(app)
                .get('/commonstudents')
                .query(query)
                .end((err, response) => {
                    response.body.should.have.status(200);
                    response.body.data.should.have.property('students');
                    done();
                })
        });
        it("Test query with multiple teacher emails >>> It should give status: 200", (done) => {
            const query = {
                teacher: "teacherdelontoh@gmail.com",
                teacher: "teacherken@gmail.com"
            };
            chai.request(app)
                .get('/commonstudents')
                .query(query)
                .end((err, response) => {
                    response.body.should.have.status(200);
                    response.body.data.should.have.property('students');
                    done();
                })
        });
    })
])
