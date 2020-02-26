module.exports = (app) => {
    const notes = require('../controller/note.controller');

    app.post('/notes', notes.create)

    app.get('/findAll', notes.findAll);

    app.get('/notes', notes.findOne);

    app.post('/update', notes.update);

    app.delete('/delete', notes.delete);
}
