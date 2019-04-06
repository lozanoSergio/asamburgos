const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const routes = require('../routes')
const bodyParser = require('body-parser')

//Routes
const userProfileRoutes = require('./routes/userProfile')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = routes.getRequestHandler(app)

mongoose.connect(process.env.NEXT_SERVER_DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Database Connected!'))
  .catch(err => console.error(err))

app
    .prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.json());

        server.use('/api/v1/userProfiles', userProfileRoutes);

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send({
                    title: 'Unauthorized',
                    detail: 'Unauthorized Access!'
                });
            }
        });

        server.listen(3000, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })