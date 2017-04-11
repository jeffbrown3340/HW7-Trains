(function() {
    var db0 = firebase.database();

    var name = "";
    var destination = "";
    var ftt = "";
    var freq = 0;
    var loopStopper = 0;

    $('#add-train-btn').on('click', function() {
        event.preventDefault();
        //get the input
        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        ftt = $("#ftt-input").val().trim();
        freq = $("#freq-input").val().trim();
        // validate the input, if any are empty return, placeholder advises user
        if (!inputsArePopulated([name, destination, ftt, freq])){return}
        // associate/set the time to the first day of the unix epoch, just because
        var fttDate = moment("01/01/1970, " + ftt, "MM/DD/YYYY, HH:mm");
        // additional validation for ftt (first train time)
        if (!fttDate.isValid()){
        // if (ftt.length !== 5 || ftt.charAt(2) !== ':' || isNaN(ftt.split(':')[0]) || isNaN(ftt.split(':'))[1]){
            $("#ftt-input").attr("placeholder", "INVALID input, enter time as HH:MM, try again ...");
            $("#ftt-input").val('');
            return;
        }
        //push to firebase
        var fttUnix = fttDate.unix();
        db0.ref().push({
            name: name,
            destination: destination,
            ftt: fttUnix,
            freq: freq
        });
        //reset the inputs
        clearInputs();
    });

function clearInputs(){
        $("#train-name-input").val('');
        $("#destination-input").val('');
        $("#ftt-input").val('');
        $("#freq-input").val('');
}

})();

function inputsArePopulated(inputs){
    var returnValue = true;
    inputs.forEach(function (element){
        if (element === "") {returnValue = false};
    });
    return returnValue;
}