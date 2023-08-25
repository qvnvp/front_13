module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://nsrs.autumnclouds.cn/',
                changOrigin: true,
            },
        }
    },
}