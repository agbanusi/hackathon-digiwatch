
module.exports = function sockets(io) {

    return io.on('connection', socket => {
        
        socket.emit('join', { id: socket.id })
        
        
        socket.on('disconnect', () => {
            io.emit('remove-user', socket.id)
        })
        return (
            (data)=>socket.in(data.ident).emit('notify-users', data)
        )
    })
}