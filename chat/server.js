const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit= require('@pusher/chatkiet-server')

const app = express()
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:4b2a59b9-1bdd-4ff4-a0dc-ec0b224906dd',
    key: '9c554442-7c4a-4eac-b973-3065a8933fa0:0DLJ/IXqiWH3iwh2BnSCfDz0gZDlw+OZqppuKZ3ae20='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({userId: req.query.user_id})
    res.status(authData.status).send(authData.body)
})
const PORT = 3000
app.listen(PORT, err => {
    if (err) {
        console.error(err)
    } else {
        console.log('Running on port ${PORT}')
    }
})