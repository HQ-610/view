(function(){
    d3.csv("../data/data.csv", function (error, data) {
        if (error) throw error;
        if (data.length == 0) {
            parent.document.getElementById("content").src = "../component/importFile.html";
            return;
        }

        $("#container").append('<img src="../py/fft.png">')
    })
})()