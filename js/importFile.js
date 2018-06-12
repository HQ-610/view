(function () {
    var container = document.getElementById("container");
    var fileInput = document.getElementById("fileInput");
    container.addEventListener("click", function () {
        fileInput.click();
    })
    fileInput.addEventListener("click", function () {
        fileInput.onchange = function () {
            var reader = new FileReader();
            reader.readAsText(this.files[0]);
            reader.onload = function (e) {
                postData('/file/save', {
                    dataSource: this.result
                })
                .then(function(res) {
                    if(res) {
                        $('#typeBtn').parent().css('display', 'block');
                        $('#typeBtn').children('button').eq(0).click(function() {
                            var value = $('#typeBtn').prev().val(),
                                params = {};
                            if(value === '癫痫类') {
                                params = {
                                    label: {
                                        name: value,
                                        target: {
                                            '0': '重度',
                                            '1': '严重',
                                            '2': '轻微'
                                        }
                                    },
                                    data: []
                                }
                            } else {
                                params = {
                                    label: {
                                        name: value,
                                        target: {
                                            '0': '开心',
                                            '1': '不开心'
                                        }
                                    },
                                    data: []
                                }
                            }
                            getData('/db/select')
                            .then(function(res) {
                                if(res) {
                                    var result = res.filter(function(item) {
                                        return item.label.name === value
                                    });
                                    if(!result.length) {
                                        postData('/db/add', {
                                            params
                                        })
                                        .then(function(res) {
                                            if(res) {
                                                alert('添加成功');
                                            }
                                        });
                                    } else {
                                        alert('已有对应数据');
                                    }
                                    $('#typeBtn').parent().css('display', 'none');
                                }
                            });
                        });
                        $('#typeBtn').children('button').eq(1).click(function() {
                            $('#typeBtn').parent().css('display', 'none');
                        });
                    }
                });
            };
        }
    })
})();