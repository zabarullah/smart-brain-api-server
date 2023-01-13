const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
    apiKey: '6b3500d33e07448f97c71d3951597925' /* The key is a config var - Environment variable onHeroky settings */
  });
// will try '53e1df302c079b3db8a0a36033ed2d15' instead of Clarifai.FACE_DETECT_MODEL, as the latter is not working
const handleApiCall = (req, res) => {
    app.models.predict('53e1df302c079b3db8a0a36033ed2d15', req.body.input)
    .then(data => {
        res.json(data);
        console.log(data); 
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
