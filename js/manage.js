$(function() {
    getData('/db/select')
    .then(function(res) {
        if(res.length) {
            var value = '';
            res.forEach(function(item) {
                value += '<tr><td class="td1" rowspan=' + item.data.length + '>' + item.label.name;
                for (i in item.label.target) {
                    value += '<br />' + i + ':' + item.label.target[i];
                }
                if(item.data.length) {
                    item.data.forEach(function(each, index) {
                        value += '</td><td class="td2">' + each.areaData + '</td><td class="td3" id="' + item.label.name + index + '">' + each.case + '</td><td class="td4"><button onclick="modifying(' + "'" + item.label.name + "'" + ',' + index +')">修改</button> <button onclick="deleting(' + "'" + item.label.name + "'" + ',' + index +')">删除</button></td></tr>';
                    });
                } else {
                    value += '<td colspan="3">无数据</td></tr>';
                }
            });
            $('#tr').after(value);
        } else {
            $('#tr').after('<tr><td colspan="4">无数据</td></tr>');
        }
    });
});

function modifying(name, index) {
    $('#' + name + index).replaceWith('<select id="sele"><option>请选择</option><option value="0">0</option><option value="1">1</option></select>');
    $('#sele').change(function() {
        postData('/db/modify', {
            name,
            index,
            value: $('#sele').val()
        })
        .then(function(res) {
            if(res) {
                window.location.reload();
            }
        });
    });
}

function deleting(name, index) {
    postData('/db/delete', {
        name,
        index
    })
    .then(function(res) {
        if(res) {
            window.location.reload();
        }
    });
}