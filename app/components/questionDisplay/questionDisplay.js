angular.module("countdownApp").component("questionDisplay", {
    bindings: {
        number: "<",
        showAnswer: "<"
    },
    controller: ["$http", "$scope", function($http, $scope){
        var self = this;

        self.$onInit = function(){
            $http.get("data.json").then(function(data){
                self.questions = data.data.questions;

                $scope.$watch(function() { return self.number; }, refresh);  
                
                refresh();
            }, function(data){
        
            });
        };

        self.$onDestroy = function(){
            
        };

        function refresh(){
            self.question = _.find(self.questions, function(o){
                return o.number === self.number;
            })
        }
       
    }],
    templateUrl: "app/components/questionDisplay/questionDisplay.html"
})