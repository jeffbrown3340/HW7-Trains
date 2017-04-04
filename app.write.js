(function() {
    var database = firebase.database();

    var name = "";
    var destination = "";
    var ftt = "";
    var freq = 0;

    $('#add-train-btn').on('click', function() {
        event.preventDefault();

        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        ftt = $("#ftt-input").val().trim();
        freq = $("#freq-input").val().trim();

        fttUnix = moment(ftt, "MM/DD/YYYY").unix();

        database.ref().push({
            name: name,
            destination: destination,
            ftt: ftt,
            freq: freq
        });

        $("#train-name-input").val("");
    });

})();