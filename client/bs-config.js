module.exports = {
    "port": 8000,
    "files": ['./**/*.{html,htm,css,js}', "./src/**/*.{html,htm,css,js}"],
    "server": ['./', './src', './node_modules'],
    ghostMode: false,
    reloadDelay: 1000,
    reloadDebounce: 1000,
    injectChanges: false,
    minify: false
}