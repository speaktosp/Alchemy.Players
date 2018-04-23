myApp.factory('SessionService', function(){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            return sessionStorage.removeItem(key);
        },
        isValidSession:function(){
            if(this.get('token')){
                return true;
            }
            else{
              return false;
            }
        },
        createPOSTAuthHeader: function(){
            let headerConfig = null;
            if(this.isValidSession()){
                headerConfig = {'headers':{
                                           'Authorization': this.get('token'),
        				                           'Content-Type' : 'application/json'
                                          }
                               };
            }
            return headerConfig;
        },
        createAuthHeader: function(){
          let headerConfig = null;
          if(this.isValidSession()){
              headerConfig = {'headers':{'Authorization': this.get('token')}};
          }
          return headerConfig;
        }
    };
});
