const Subject = require('./../models/forum/subject');
const Message = require('./../models/forum/message');
const socketConfig = require('./../config/socket-singletion');

module.exports.createSubject = async function (io, sub) {
    const { subjectName, authorLogin, subjectDate, authorId  } = sub;
    const subject = new Subject({ subjectName, authorLogin, subjectDate, authorId  });

    try {
        await subject.save();

        const query   = {};
        const options = {
            sort: { 'createdAt': -1 },
            lean: true,
            page: 1,
            limit: 5
        };
        try {
            await Subject.paginate(query, options).then(function(result) {
                io.emit('SubjectAdded', result);
            });
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports.getSubjects = async function (req, res) {
    const query   = {};
    const options = {
        sort: { 'createdAt': -1 },
        lean: true,
        page: 1,
        limit: 5
    };
    try {
       await Subject.paginate(query, options).then(function(result) {
           res.send(result);
       });
    } catch (e) {
        console.log(e);
    }
};

module.exports.getUserSubjects = async function (req, res) {
    const userId = req.params.userId;

    try {
        const subjects = await Subject.find({ authorId: userId }).sort([['createdAt', -1 ]]);

        if (subjects) {
            res.status(200);
            res.send(subjects);
        } else {
            res.status(404);
            res.send({ message: 'User have any subjects yet.'});
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports.getSubject = async function (req, res) {
    const subjectId = req.params.subjectId;

    try {
        const subject = await Subject.findOne({ _id: subjectId });

        if (subject) {
            res.status(200);
            res.send(subject);
        } else {
            res.status(404);
            res.send({ message: 'Not found!'});
        }
    } catch (e) {
        console.log(e);
    }
};

/*
 * Create message. POST => /subject/message/create
 * ws => emit 'MessageAdded'
 */
module.exports.createMessage = async function (req, res) {
    const { content, authorLogin, subjectName, subjectId } = req.body;
    const message = new Message({ content, authorLogin, subjectName, subjectId });

    try {
        await message.save();
        res.status(201);
        try {
            await Message.find({subjectId: subjectId}).sort([['createdAt', -1]]).exec((err, messages) =>
            {
                socketConfig.SocketSingleton.io.emit('MessageAdded', messages);
            });
        } catch (e) {
            console.log(e);
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports.getSubjectMessages = function (req, res) {
    const subjectId = req.params.subjectId;

    try {
        Message.find({ subjectId: subjectId })
            .sort([['createdAt', -1]]).exec((err, messages) => {
                if (messages) {
                    res.status(200);
                    res.send(messages);
                } else {
                    res.status(404);
                    res.send({ message: 'Not found!'});
                }
            });
    } catch (e) {
        console.log(e);
    }
};



