module.exports = {
    lintOnSave: false,
    devServer: {
        // port: 8080,
        proxy: {
            '/': {
                target: 'http://116.196.86.239:9001',  //目标接口域名
                changeOrigin: true,  //是否跨域
            },
        }, // 设置代理
    },
}
