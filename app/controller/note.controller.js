const Note = require('../models/note.model');

module.exports = {
    create(req, res) {
        if (!req.body.authorName) {
            return res.status(400).send({
                message: "note cannot be empty"
            });
        }
        const note = new Note({
            title: req.body.title || "untitles note",
            authorName: req.body.authorName
        });

        console.log(note)

        note.save().
            then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "some Error occured while creating note"
                });
            });

    },
    findAll(req, res) {
        Note.find()
            .then(data => {
                console.log(data)
                res.send(data)
            }).catch(err => {
                console.log("Somethng wenr wrog--> ", err)
                res.status(500).send({ message: "Somethong went wromg while fetching data.", err: err })
            })
    },

    findOne(req, res) {
        Note.findById({_id: req.body._id})
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id"
                    });
                }
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id"
                    });
                }
                return res.status(500).send({
                    message: "error retrieving note with id"
                });
            });

    },

    update(req, res) {

        if (!req.body.authorName) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        Note.findByIdAndUpdate({_id: req.body._id}, {
            title: req.body.title || "Untitled Note",
            authorName: req.body.authorName
        }, { new: true })
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id"
                    });
                }
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id "
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id "
                });
            });
    },

    delete(req, res) {
        
        Note.findOneAndDelete({ _id: req.body._id })
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id "
                    });
                }
                res.send({ message: "Note deleted successfully" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.authorName === 'NotFound') {
                    return res.status(404).send({
                        message: "Note not found"
                    });
                }
                return res.status(500).send({
                    message: "could not delete note wih id"
                });
            });
    }
}
