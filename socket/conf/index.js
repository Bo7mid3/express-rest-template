module.exports = {
    cors: {
        origins: ["*"],
        handlePreflightRequest: (req, res) => {
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
                "Access-Control-Allow-Credentials": true,
            };
            res.writeHead(200, headers);
            res.end();
        },
    },
    methods: ["GET", "POST"],
}