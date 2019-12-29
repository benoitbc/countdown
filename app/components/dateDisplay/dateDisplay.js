angular.module("countdownApp").component("dateDisplay", {
    bindings: {
        currentImageNumber: "=",
        showAnswer: "=",
        showNewYear: "="
    },
    controller: ["$interval", function($interval){
        var self = this;

        self.$onInit = function(){
            self.showNewYear = false;
            self.showAnswer = false;
            self.displayInterval = $interval(refresh, 1000);
            refresh();
        };

        self.$onDestroy = function(){
            $interval.cancel(self.displayInterval);
        };

        function refresh() {
            self.date = moment();

            var targetDate = moment(self.date).endOf("year");
            self.targetDate = targetDate;

            // Déterminer si on est le premier janvier. On affiche les réponses le 1er janvier seulement.
            var isNewYear = self.date.date() === 1 && self.date.month() === 0;

            // Déterminer si on est dans les premières dix minutes de l'année.
            self.showNewYear = isNewYear && self.date.hour() == 0 && self.date.minute() < 10;

            // Si on est le 1er janvier, on affiche une image aux 5 secondes (pour les réponses).
            // Toutes les autres journées de l'année, on affiche une image par minute.
            if(isNewYear) {
                self.showAnswer = true;
                var startOfYear = moment(self.date).startOf("year");
                self.currentImageNumber = Math.floor(moment(self.date).diff(startOfYear, "seconds") / 10) % 60;
            } else {
                self.currentImageNumber = self.date.minute();
            }
            
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