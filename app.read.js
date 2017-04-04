(function() {
    var dataRef = firebase.database();
    dataRef.ref().on("child_added", function(snapshot) {
        var fmt = "MM/DD/YYYY HH:mm"
        var loopStopper = 0;
        var train = snapshot.val();
        var tr = $("<tr>");
        var td = $("<td>");
        //console.log(moment(train.ftt).format());

        firstArrival = moment();
        firstArrival.set("seconds", 0);
        firstArrival.set("minute", moment(train.ftt).minute());
        firstArrival.set("hour", moment(train.ftt).hour());
        //var firstArrival = moment(moment(train.ftt).format(fmt), fmt);
        //console.log("firstArrival=", firstArrival.format(fmt));
        //var firstArrival = moment(train.ftt);
        var nextArrival = firstArrival;
        //console.log('nextArrival=',nextArrival.format(fmt));
        while (moment(nextArrival) <= moment()){
            loopStopper++;
            if (loopStopper > 50){
                console.log("loopStopper=", loopStopper);
                break;
            }
            nextArrival = nextArrival.add(train.freq, "minutes");
        }
        var prettyNextArr = nextArrival.format(fmt);
        tr.append(td.clone().html(train.name));
        tr.append(td.clone().html(train.destination));
        tr.append(td.clone().html(train.freq));
        tr.append(td.clone().html(prettyNextArr)); 
        tr.append(td.clone().html("0000"));
        $("#train-table tbody").append(tr);
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})();
