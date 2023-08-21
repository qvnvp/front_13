module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://uapt3z.natappfree.cc/doc.html',
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
