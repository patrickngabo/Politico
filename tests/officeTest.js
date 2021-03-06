import chai from 'chai';
import chaihttp from 'chai-http';
import chaiThing from 'chai-things';
import app from '..';

chai.should();
chai.use(chaihttp);
chai.use(chaiThing);

let adminToken;
before((done) => {
  const admin = {
    email: 'admin@gmail.com',
    password: '12345678'
  };

  chai.request(app).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      done();
    });
});

describe('Offices end-point tests result', () => {
  it('Should POST (Create) an office', (done) => {
    const office = {
      officetype: 'Federal',
      officename: 'Presidency',
    };

    chai.request(app)
      .post('/api/v1/offices')
      .send(office)
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('type', office.type);
        res.body.data.should.all.have.property('name', office.name);
        res.body.data.should.all.have.property('location', office.location);
        res.body.data.should.all.have.property('contact', office.contact);
        done();
      });
  });

  it('Should GET one a office', (done) => {
    const office = {
      id: 1
    };

    chai.request(app)
      .get('/api/v1/offices/' + office.id + '')
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('officetype');
        res.body.data.should.all.have.property('officename');
        res.body.data.should.all.have.property('createdOn');
        done();
      });
  });

  it('Should GET all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set('access-token', adminToken)
      .end((_err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data.should.all.have.property('id');
        res.body.data.should.all.have.property('officetype');
        res.body.data.should.all.have.property('officename');
        res.body.data.should.all.have.property('createdOn');
        done();
      });
  });
});