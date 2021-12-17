const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
    apiKey: '6b3500d33e07448f97c71d3951597925'
  });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json('unable to work with API')
    })
}


const handleImage = (req, res, sqldatabase) => {
    const {id} = req.body;
    sqldatabase('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};