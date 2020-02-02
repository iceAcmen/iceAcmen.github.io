var Urlutil = (function(){
    return {
        getUrlKey : function(name,url){
        　　return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
        
        }
    }
})();