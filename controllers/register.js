const handleRegister = (req, res, bcrypt, db) => {
  const { email, name, password} = req.body;
  if (!email || !name || !password) {
    res.status(400).json('unable to register with provided credentials')
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx('login').insert({
      hash: hash,
      email: email
    })
    
    .returning('email')
      .then(loginEmail => {
        return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
      })
      .then(trx.commit)
      .then(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
}