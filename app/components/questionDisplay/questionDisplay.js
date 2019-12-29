angular.module("countdownApp").component("questionDisplay", {
    bindings: {

    },
    controller: ["$http", function($http){
        var self = this;

        self.$onInit = function(){
            $http.get("data.json").then(function(data){
                self.questions = data.data.questions;
            }, function(data){
        
            });
        };

        self.$onDestroy = function(){
            
        };
       

    }],
    templateUrl: "app/components/questionDisplay/questionDisplay.html"
})