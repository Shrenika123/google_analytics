const dependency=require('../controllers/helperFunctions')
const chai = require("chai");
const expect = chai.expect;
let mockArray=[{event_value: '528',uuid: '0215bef6f0d6414b8fad23b6fbf7b225',location: '/'},{event_value: '527',uuid: '0215bef6f0d6414b8fad23b6fbf7b225',location: '/?'}]
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
const assert = require('assert');

/**
*Testing functinality for getMostTimeSpentPages function and Api
*/
describe('all functinality of getMostTimeSpentPages', function() {
  
  describe('uri_pattern_matching', function() {
    it('type array & res equal to mock data ', function() {
      var array=dependency.uri_pattern_matching(mockArray,2)
      assert.equal(typeof(array),typeof([{ event_value: '528',
      uuid: '0215bef6f0d6414b8fad23b6fbf7b225',
      location: '/' }]));
      
      expect(array).to.deep.include.members([ { event_value: '528',
      uuid: '0215bef6f0d6414b8fad23b6fbf7b225',
      location: '/' } ])
    });
  });
  
  
  
  describe('/reports/pages', () => {
      it('it should GET most viewed pages', (done) => {
        chai.request('http://localhost:8000')
            .get('/reports/pages/?orderBy=timeSpent&count=3')
            .set('X-Auth-Token', 'not_so_secret_key')
            .end((err, res) => {
                should.exist(res);
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
      
      it('it should return auth failure', (done) => {
        chai.request('http://localhost:8000')
            .get('/reports/pages/?orderBy=timeSpent&count=3')
            .set('X-Auth-Token', 'not_so_secret_')
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(401);
                expect(res.text).to.equal('please authenticate')
              done();
            });
      });
      it('when query count parameter is not defined', (done) => {
        chai.request('http://localhost:8000')
            .get('/reports/pages/?orderBy=timeSpent&count=abc')
            .set('X-Auth-Token', 'not_so_secret_key')
            .end((err, res) => {
                should.exist(res);
                res.should.have.status(404);
                expect(res.text).to.equal('Invalid query parameter')
              done();
            });
      });
  });
});
  
