const Clarifai = require('Clarifai');

const app = new Clarifai.App({
  apiKey: '314dac314afa41eda5c4185a1396b3f4'
});

const handleApiCall = (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input)
    .then(data =>{
      res.json(data)
    })
    .catch(err => res.status(400).json('error with image input'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to update entries'))
    }

    module.exports = {
      handleImage: handleImage,
      handleApiCall: handleApiCall
    }