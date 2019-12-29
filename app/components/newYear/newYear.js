angular.module("countdownApp").component("newYear", {
    bindings: {
    },
    controller: [function(){
        var self = this;
        self.year = moment().year();
    }],
    templateUrl: "app/components/newYear/newYear.html"
})