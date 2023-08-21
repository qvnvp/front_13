module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gwy3zr.natappfree.cc/',
                changOrigin: true,
                onProxyReq(proxyReq, req, res) {
                    // 在请求头中添加 token
                    user = uni.getStorageSync('user')
                    if (user) {
                        proxyReq.setHeader('token', user.token);
                    }
                }
            },
        }
    },
}
