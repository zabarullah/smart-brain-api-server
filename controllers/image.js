const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
    apiKey: '6b3500d33e07448f97c71d3951597925' /* The key is a config var - Environment variable onHeroky settings */
  });
// will try below object with api details instead of Clarifai.FACE_DETECT_MODEL, as the latter is not working
const handleApiCall = (req, res) => {
    app.models.predict({
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
    }, req.body.input)
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
