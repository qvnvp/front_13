module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://nsrs.autumnclouds.cn/',
                changOrigin: true,
                onProxyReq(proxyReq, req, res) {
                    // 在请求头中添加 token
					proxyReq.setHeader('token','eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAADWQvU7DMBSF3-XOIf6P7eysDC1sXuzEoUVtEsUpVKo6MbHxCDwBDJVQBx4HWh4D1xGbr79zzz06OwgbByXczGfzq7v59Qwy8NseSlJoqgtaaJHBJvghanYG7KMd7WCgNLAYx75EiEiRE6lyollOuCo1xhi1YQiIYsoQVohSZJ2VhKrKNY3mXEplFa7qptJC19xKlz_09wYyA9Xg7ejr2-XamymDYJIIFk0jXXTOLX1I588f7-fX5-x0PJ4Oh-z38xCnZLGsI5fx0dpkYuDn6-37-JJgb0N46oY6_VOtleBVzYkiKuZrfCWcdBx7IaXGctpYdO1kQxilXBdMMZbI0K0u4BIs2NWYNJqzIsHgt_-s3aydnzqLlcSOLpI97P8ACU1ZN3sBAAA.vQ913Yz8pG8gT5YM5D4WS9yV5H_xWKuaVpdJ3Qy2nLPSAPme7Ek7QqxaibHPxONNehYmFweARyvPRPjDBzdk4Q')
                    user = uni.getStorageSync('user')
					// user = localStorage.getItem('user')
                    if (user) {
                         proxyReq.setHeader('token', user.token);
			
                    }
                }
            },
        }
    },
}
