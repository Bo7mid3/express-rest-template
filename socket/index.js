module.exports = (server) => {
    const io = require('socket.io')(server, {
        methods: ["GET", "POST"]
    });
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
          jwt.verify(socket.handshake.query.token, process.env.SECRET_KEY, function(err, payload) {
            if (err) return next(new Error('Authentication error'));
            const { email } = payload;
            socket.email = email;
            /*socket.friends = [];
            Friend.find({
              $or: [
                { friend1: username },
                { friend2: username }
              ]
            }, (err, friends) => {
              if (err)
                return next(new Error('Database connection error'))
              for (const friend of friends) {
                socket.friends.push(friend.friend1 == username ? friend.friend2 : friend.friend1)
              }
            })*/
            next();
          });
        }
        else {
          next(new Error('Authentication error'));
        }
      }).on('connection', async (socket) => {
        //console.log("user connected");
        socket.on("join", (msg) => console.log("user connected"));
    });
}