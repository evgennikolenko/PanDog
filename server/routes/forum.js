const express = require('express');
const forum = require('./../controllers/forum');
const passport = require('passport');

const passportAuth = passport.authenticate('jwt', {session: false});

const router = express.Router();

router.post('/subjects/create', passportAuth, forum.createSubject, forum.getSubjects);

router.get('/subjects', passportAuth, forum.getSubjects);

router.get('/subjects/:userId', passportAuth, forum.getUserSubjects);

router.get('/subject/:subjectId', passportAuth, forum.getSubject);

router.post('/subject/message/create', passportAuth, forum.createMessage);

router.get('/subject/message/:subjectId', passportAuth, forum.getSubjectMessages);

module.exports = router;