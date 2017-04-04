(function() {
    var dataRef = firebase.database();
    dataRef.ref().on("child_added", function(snapshot) {
        var loopStopper = 0;
        var train = snapshot.val();
        var tr = $("<tr>");
        var td = $("<td>");
        //var firstArrival = moment(moment(train.ftt).format("HH:mm"), "HH:mm");
        var firstArrival = moment();
        console.log('firstArrival=',firstArrival.format("HH:mm"));
        var nextArrival = firstArrival;
        console.log('nextArrival=',nextArrival.format("HH.mm"));
        while (moment(nextArrival) <= moment()){
            loopStopper++;
            if (loopStopper > 50){
                console.log("loopStopper=", loopStopper);
                break;
            }
            nextArrival = nextArrival.add(train.freq, "minutes");
        }
        var prettyNextArr = nextArrival.format("HH:mm");
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
