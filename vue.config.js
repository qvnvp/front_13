module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://v2w7u7.natappfree.cc/',
                changOrigin: true,
                onProxyReq(proxyReq, req, res) {
                    // 在请求头中添加 token
					proxyReq.setHeader('token','eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAADWQy26DMBBF_2XWBPwC2-y77SK0O0uRsd1ACxhh00aK8u91TLu7mnPvvO4Q9h5aeO3O3em9ezlDAe62QosbSTiilKEC9uC25Lkr0N866k1Bq2CIcQ1tVZlTCFNpY4g6jqY0fq72dfLahqqf_LUiiBDUVJj8KUxwwzilF06s6Ms47HNfYoTQBZWf61VBocBsTkdn38bZqWOVmnJc0-RKdLSpyJNYdOYK_Oa-xpxcdQg_frO5TKQUNTOWYYEFx-TDmbrnPUOu5lwifiQGvxxdMCWEyYYKSjPZ_PQEz5FBTzF7JKNNhsHd_tmSLnDHU9KJmImn5QGPX7mUjz9cAQAA.Rt4JkmWlHSaB_-2fbCialJU2_V9Q9Z7F9y3R9Kf6r6ZJBlgbMC80NSqbRgeOs35CWw-xDeGAZ1pH6Arib4CQdg')
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
