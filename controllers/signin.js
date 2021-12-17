const handleSignin = (req, res, sqldatabase, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission')
     }
    sqldatabase.select('email', 'hash').from('login')
      .where('email', '=', req.body.email)
      .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
          return sqldatabase.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('invalid username or password')
        }
      })
      .catch(err => res.status(400).json('invalid username or password'))
}

module.exports = {
    handleSignin: handleSignin
};