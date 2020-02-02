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

    function authorization() {
        let code = Urlutil.getUrlKey("code", "https://iceacmen.github.io/?code=1c9cf47fb0eeaf688fe2");
            if (_.isEmpty(code)) {
              //跳转到github授权页面
              // https://github.com/login/oauth/authorize?client_id=aa095e4edcac79b02a6e
              window.open("https://github.com/login/oauth/authorize?client_id=" + this.clientId + 'redirect_uri=file:///F:/ICE/VScode/iceAcmen.github.io/index.html');  
            }
            console.log("code : " + code)
            
            fetch('https://github.com/login/oauth/access_token?client_id=aa095e4edcac79b02a6e&client_secret=b7107a6b6c65a1ae13ab2494754b4f17f2343c05&code=559d4bd5fbc342fd7c08', {
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