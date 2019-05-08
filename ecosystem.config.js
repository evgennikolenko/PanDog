
module.exports = {
    apps : [{
        name        : "server",
        script      : "./server/index.js",
        watch       : true,
        instances   : 4,
        exec_mode   : "cluster",
        env: {
            "PORT": 3000,
            "NODE_ENV": "development"
        }
    }]
};
