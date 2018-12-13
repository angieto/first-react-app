import express from 'express';
import config from '../config';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';

let mdb;
MongoClient.connect(config.mongodbUri, { useNewUrlParser: true }, (err, db) => {
    assert.equal(null, err);
    mdb = db;
});

const router = express.Router();

router.get('/contests', (req, res) => {
    let contests = {};
    mdb.collection('contest').find({})
       .project({
           categoryName: 1,
           contestName: 1
       })
       .each((err, contest) => {
           assert.equal(null, err);
           if (!contest) {
               res.sendDate({ contests });
               return;
           }
           contest[contest._id] = contest;
       });
});

router.get('/names/:nameIds', (req, res) => {
    const nameIds = req.params.nameIds.split(',').map(ObjectID);
    let names = {};
    mdb.collection('names').find({_id: { $in: nameIds }})
       .each((err, name) => {
           assert.equal(null, err);
           if (!name) {
               res.sendDate({ names });
               return;
           }
           names[name._id] = name;
       });
});

export default router;