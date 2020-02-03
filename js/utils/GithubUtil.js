var GithubUtil = (function() {
    function getUserInfo(token) {
        fetch('https://api.github.com/user', {
            method: 'GET',
            headers:{
            'Accept': 'application/json',
            'Authorization': 'token ' + token
            }
        }).then(res=>{
            debugger
            if (!res.ok) {
            res.text().then(json=>{
                console.log("获取用户信息失败", json)  
            })
            return;
            }
            res.json().then(json=>{
            console.log("获取token成功", json)
            })
            
        }).catch(err=>{
            debugger
            console.log("获取token失败", err)
        });
    }

    function authorization(vm) {
        let clientId = vm.clientId;
        let clientSecret = vm.clientSecret;
        let code = Urlutil.getUrlKey("code", window.location.href);
        code = '2fa59e77c7d0881fd779'
            if (_.isEmpty(code)) {
              //跳转到github授权页面
              // https://github.com/login/oauth/authorize?client_id=aa095e4edcac79b02a6e
              let authCodeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
              window.open(authCodeUrl);
              return;
            }
            console.log("code : " + code)
            let getTokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
            vm.$http.jsonp(getTokenUrl,
            {
              params: {//请求参数
                  // wd:this.v1
              },
              // emulateJSON: true,
              headers:{
                Accept: 'application/json'
              },
              jsonp:'cb'
            }).then(function(res){//回调
              //字符串转成json对象
              //console.log(JSON.parse(res.bodyText).s);
              //JSON.parse() 方法将数据转换为 JavaScript 对象。
              console.log('获取token响应', res.bodyText);
            }).catch(err=>{
              console.error('获取token失败', err)
            })
            // fetch(getTokenUrl, {
            //   method: 'GET',
            //   // mode: 'no-cors',
            //   headers:{
            //     'Accept': 'application/json'
            //   }
            // }).then(res=>{
            //   if (!res.ok) {
            //     res.text().then(json=>{
            //       console.log("获取token失败", json)  
            //     })
            //     return;
            //   }
            //   console.log("获取token成功", res)
            // }).catch(err=>{
            //   console.log("获取token失败", err)
            // })
    }

    return {
        getUserInfo, authorization
    }
})()