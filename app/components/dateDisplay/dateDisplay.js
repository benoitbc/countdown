angular.module("countdownApp").component("dateDisplay", {
    bindings: {

    },
    controller: ["$interval", function($interval){
        var self = this;

        self.$onInit = function(){
            self.displayInterval = $interval(refresh, 1000);
            refresh();
        };

        self.$onDestroy = function(){
            $interval.cancel(self.displayInterval);
        };

        function refresh() {
            self.date = moment();

            var targetDate = moment().endOf("year");
            self.targetDate = targetDate;

            self.hours = self.date.hour();
            self.minutes = self.date.minute();
            self.seconds = self.date.second();

            var differenceDays = targetDate.diff(self.date, "days");
            targetDate.subtract(differenceDays, "days");
            var differenceHours = targetDate.diff(self.date, "hours");
            targetDate.subtract(differenceHours, "hours");
            var differenceMinutes = targetDate.diff(self.date, "minutes");
            targetDate.subtract(differenceMinutes, "minutes");
            var differenceSeconds = targetDate.diff(self.date, "seconds") + 1;

            self.differenceDays = differenceDays;
            self.differenceHours = differenceHours < 10 ? "0" + differenceHours : differenceHours;
            self.differenceMinutes = differenceMinutes < 10 ? "0" + differenceMinutes : differenceMinutes;
            self.differenceSeconds = differenceSeconds < 10 ? "0" + differenceSeconds : differenceSeconds;
        }

    }],
    templateUrl: "app/components/dateDisplay/dateDisplay.html"
})