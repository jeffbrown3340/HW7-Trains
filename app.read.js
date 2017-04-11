(function() {
    //declare firebase
    var db0 = firebase.database();
    //run the loop initially on on each addition to the database
    db0.ref().on("child_added", function(snapshot) {
        var fmt = "HH:mm";
        var runawayStopper = 0;
        // 24 hours in minutes
        var runawayLimit = 24 * 60;
        var train = snapshot.val();
        var tr = $("<tr>");
        var td = $("<td>");
        var nextArrival, minutesAway, tempMoment;

        //create a moment for the daily first arrival time
        //the date part doesn't matter, we'll ignore it
        //it just parks the value to grab the time of day into currDateArrival
        tempMoment = moment.unix(train.ftt);
        //create a now moment and assign the hours and minutes part to our current date
        var currDateArrival = moment();
        currDateArrival.hour(tempMoment.hour());
        currDateArrival.minute(tempMoment.minute());
        currDateArrival.second(0);
        console.log(train.name + " first arrives at " + currDateArrival.format(fmt) + " daily.")
        //start at the first arrival and add frequency until
        // next arrival is future (greater than now)
        nextArrival = currDateArrival;
        while (nextArrival <= moment()){
            runawayStopper++;
            if (runawayStopper > runawayLimit){
                console.log("STOPPED - runawayStopper/nextArrival=", runawayStopper);
                break;
            }
            nextArrival = nextArrival.add(train.freq, "minutes");
        }
        //just counting the minutes!
        runawayStopper = 0;
        tempMoment = moment();
        minutesAway = -1;
        while (tempMoment <= nextArrival){
            runawayStopper++;
            if (runawayStopper > runawayLimit){
                console.log("STOPPED - runawayStopper/minutesAway=", runawayStopper);
                break;
            }
            tempMoment.add(1, "minute");
            minutesAway++;
        }
        var prettyNextArr = nextArrival.format(fmt);
        tr.append(td.clone().html(train.name));
        tr.append(td.clone().html(train.destination));
        tr.append(td.clone().html(train.freq));
        tr.append(td.clone().html(prettyNextArr)); 
        tr.append(td.clone().html(minutesAway));
        $("#train-table tbody").append(tr);
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})();
