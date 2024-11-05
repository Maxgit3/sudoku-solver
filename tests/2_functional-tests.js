const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
let puzzleString1 = '.7.897....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
let completedString = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
let invalidString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A';
let invalidLength = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({puzzle: puzzleString})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.solution, completedString, 'test api solve');
            done();
          })
    })
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field missing', 'test api solve');
            done();
          })
    })
    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({puzzle: invalidString})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid characters in puzzle', 'test api solve');
            done();
          })
    })
    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({puzzle: invalidLength})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'test api solve');
            done();
          })
    })
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({puzzle: puzzleString1})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Puzzle cannot be solved', 'test api solve');
            done();
          })
    })
    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle: puzzleString, coordinate: 'a2', value: '3'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, true, 'test api check');
            done();
          })
    })
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle: puzzleString, coordinate: 'a2', value: '4'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false, 'test api check');
            assert.equal(res.body.conflict.length, 1, 'test api check');
            done();
          })
    })
    test('Check a puzzle placement with multiple placement conflicts: POST request to', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle: puzzleString, coordinate: 'a2', value: '5'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false, 'test api check');
            assert.equal(res.body.conflict.length, 2, 'test api check');
            done();
          })
    })
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle: puzzleString, coordinate: 'a2', value: '2'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.valid, false, 'test api check');
            assert.equal(res.body.conflict.length, 3, 'test api check');
            done();
          })
    })
    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({puzzle: puzzleString})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing', 'test api check');
            done();
          })
    })
    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle: invalidString, coordinate: 'a2', value: '2'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle', 'test api check');
          done();
        })
  })
    test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle: invalidLength, coordinate: 'a2', value: '2'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'test api check');
          done();
        })
  })
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle: puzzleString, coordinate: 'j7', value: '2'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid coordinate', 'test api check');
          done();
        })
  })
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle: puzzleString, coordinate: 'a7', value: '2a'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid value', 'test api check');
          done();
        })
  })
});

