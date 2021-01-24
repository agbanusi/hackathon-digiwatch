const express = require('express')
const app = express()
app = require('http').createServer(app)
const io = require('socket.io')(app)
const socket = require('./components/socket');
const routes = require('./components/routes')
app.use(express.json())


mongodb.connect(process.env.DB,{ useUnifiedTopology: true }, async(err,client)=>{
    const db =client.db('Cluster0')
    let id = socket(io)
    routes(app, db, id)
    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port '+ (process.env.PORT || 8082));
     })
})