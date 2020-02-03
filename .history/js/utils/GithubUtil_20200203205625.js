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

    function authorization(clientId, clientSecret) {
        let code = Urlutil.getUrlKey("code", window.location.href);
            if (_.isEmpty(code)) {
              //跳转到github授权页面
              // https://github.com/login/oauth/authorize?client_id=aa095e4edcac79b02a6e
              let authCodeUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;
              // window.open(authCodeUrl);
              fetch(authCodeUrl, {
                method: 'GET',
              }).then(res=>{
                console.log('获取code响应',res);
              })
            }
            console.log("code : " + code)
            let getTokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
            fetch(getTokenUrl, {
              method: 'GET',
              mode: 'no-cors',
              headers:{
                'Accept': 'application/json'
              }
            }).then(res=>{
              debugger
              if (!res.ok) {
                res.text().then(json=>{
                  console.log("获取token失败", json)  
                })
                return;
              }
              console.log("获取token成功", res)
            }).catch(err=>{
              debugger
              console.log("获取token失败", err)
            })
    }
    return {
        getUserInfo, authorization
    }
})()