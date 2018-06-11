(function () {
    var container = document.getElementById("container");
    var fileInput = document.getElementById("fileInput");
    container.addEventListener("click", function () {
        fileInput.click();
    })
    fileInput.addEventListener("click", function () {
        fileInput.onchange = function () {
            console.log(this.files[0]);
            var reader = new FileReader();
            reader.readAsText(this.files[0]);
            reader.onload = function (e) {
                console.log(this.result);
            };
        }
    })
})()