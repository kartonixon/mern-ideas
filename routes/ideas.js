const router = require('express').Router();
let Idea = require('../models/idea.model');

router.route('/').get((req, res) => {
  Idea.find().sort({"createdAt": -1})
    .then(ideas => res.json(ideas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const content = req.body.content;
  const upvotes = 0;

  const newIdea = new Idea({
    content,
    upvotes
  });

  newIdea.save()
  .then(() => res.json('Idea added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Idea.findByIdAndDelete(req.params.id)
    .then(() => res.json('Idea deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Idea.findById(req.params.id)
    .then(idea => {
      idea.content = req.body.content;
      idea.upvotes = req.body.upvotes;

      idea.save()
        .then(() => res.json('Idea updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;