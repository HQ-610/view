(function () {
    d3.csv("../data/sample_data.csv", function (error, data) {
        if (error) throw error;

        // --------------------- DATA PREPARATION SECTION ---------------------
        // console.log(data);
        // format the data
        data.forEach(function (d) {
            d.Ch_1 = +d.Ch_1;
            d.Ch_2 = +d.Ch_2;
            d.Ch_3 = +d.Ch_3;
            d.Ch_4 = +d.Ch_4;
            d.Sample = +d.Sample;
            // console.log(d);
        });
        // Define sampling rate and loop over "1-second windows" to create animation
        var data_sampling_rate = 128;
        var data_number_samples = data.length;
        var animation_refresh_rate = 30;
        var channel_data_1 = new Array(data_sampling_rate);
        var channel_data_2 = new Array(data_sampling_rate);
        var channel_data_3 = new Array(data_sampling_rate);
        var total = 3;
        // Fill the array with samples from the first window
        for (var sample = 0; sample < data_sampling_rate; sample++) {
            channel_data_1[sample] = data[sample].Ch_1;
            channel_data_2[sample] = data[sample].Ch_2;
            channel_data_3[sample] = data[sample].Ch_3;
        }

        var sample_index_1 = data_sampling_rate;
        var sample_index_2 = data_sampling_rate;
        var sample_index_3 = data_sampling_rate;


        // -------------------- CONFIGURE AND RENDER LINE PLOT ------------------------
        var width = 970,
            height = 50;
        var padding = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };
        var svg = d3.select("#graph")
            .append("svg")
            .attr("height", (height + padding.top + padding.bottom) * total)
            .attr("width", width)

        var x = d3.scaleLinear()
            .domain([1, data_sampling_rate])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([d3.min(channel_data_1, function (d) { return d; }), d3.max(channel_data_1, function (d) { return d; })])
            .range([height, 0]);

        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y(d); });
        var g = svg.append("g").attr("transform", "translate(" + padding.left + "," + padding.top + ")");
        g.append("text")
            .attr("fill", "red")
            .attr("font-size", "14px")
            .attr("text-anchor", "middle")
            .attr("x", 20)
            .attr("y", 0)
            .text("Ch_1");
        g.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height)

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        var transition1 = g.append("g")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(channel_data_1)
            .attr("class", "line");
        transition1.transition()
            .duration(animation_refresh_rate)
            .ease(d3.easeLinear)
            .on("start", tick);
        // Update function, called on each transition
        function tick() {

            // Update sample index and push a new data sample
            sample_index_1++;

            if (sample_index_1 < data_number_samples) {
                channel_data_1.push(data[sample_index_1].Ch_1);
            }
            else {
                channel_data_1.push(0);      // Fill with zeros after copying all samples from CSV file
            }

            // Redraw the line.
            d3.select(this)
                .attr("d", line)
                .attr("transform", null);

            // Adjust axis
            y.domain([d3.min(channel_data_1, function (d) { return d; }), d3.max(channel_data_1, function (d) { return d; })]);

            // Slide it to the left.
            d3.active(this)
                .attr("transform", "translate(" + x(0) + ",0)")
                .transition()
                .on("start", tick);

            // Pop the old data point off the front.
            channel_data_1.shift();

        } // End of Tick function
        var g2 = svg.append("g").attr("transform", "translate(" + padding.left + "," + (padding.top + height) + ")");
        g2.append("text")
            .attr("fill", "red")
            .attr("font-size", "14px")
            .attr("text-anchor", "middle")
            .attr("x", 20)
            .attr("y", 0)
            .attr("transform", "translate(0," + y(0) + ")")
            .text('Ch_2');
        var y2 = d3.scaleLinear()
            .domain([d3.min(channel_data_2, function (d) { return d; }), d3.max(channel_data_2, function (d) { return d; })])
            .range([height, 0]);

        var line2 = d3.line()
            .curve(d3.curveBasis)
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y2(d); });

        g2.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + 2 * y(0) + ")")
            .call(d3.axisBottom(x));

        g2.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisLeft(y));

        var transition2 = g2.append("g")
            .attr("transform", "translate(0," + y(0) + ")")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(channel_data_2)
            .attr("class", "line");
        transition2.transition()
            .duration(animation_refresh_rate)
            .ease(d3.easeLinear)
            .on("start", tick2);
        function tick2() {

            // Update sample index and push a new data sample
            sample_index_2++;

            if (sample_index_2 < data_number_samples) {
                channel_data_2.push(data[sample_index_2].Ch_2);
            }
            else {
                channel_data_2.push(0);      // Fill with zeros after copying all samples from CSV file
            }

            // Redraw the line1.
            d3.select(this)
                .attr("d", line2)
                .attr("transform", null);

            // Adjust axis
            y2.domain([d3.min(channel_data_2, function (d) { return d; }), d3.max(channel_data_2, function (d) { return d; })]);

            // Slide it to the left.
            d3.active(this)
                .attr("transform", "translate(" + x(0) + ",0)")
                .transition()
                .on("start", tick2);

            // Pop the old data point off the front.
            channel_data_2.shift();

        }
        var g3 = svg.append("g").attr("transform", "translate(" + padding.left + "," + (padding.top + 2 * height) + ")");
        g3.append("text")
            .attr("fill", "red")
            .attr("font-size", "14px")
            .attr("text-anchor", "middle")
            .attr("x", 20)
            .attr("y", 0)
            .attr("transform", "translate(0," + 2 * y(0) + ")")
            .text("Ch_3");
        var y3 = d3.scaleLinear()
            .domain([d3.min(channel_data_2, function (d) { return d; }), d3.max(channel_data_3, function (d) { return d; })])
            .range([height, 0]);

        var line3 = d3.line()
            .curve(d3.curveBasis)
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y3(d); });

        g3.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + 3 * y(0) + ")")
            .call(d3.axisBottom(x));

        g3.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0," + 2 * y(0) + ")")
            // .call(d3.axisLeft(y));

        var transition3 = g3.append("g")
            .attr("transform", "translate(0," + 2 * y(0) + ")")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(channel_data_2)
            .attr("class", "line");
        transition3.transition()
            .duration(animation_refresh_rate)
            .ease(d3.easeLinear)
            .on("start", tick3);
        function tick3() {

            // Update sample index and push a new data sample
            sample_index_3++;

            if (sample_index_3 < data_number_samples) {
                channel_data_3.push(data[sample_index_3].Ch_3);
            }
            else {
                channel_data_3.push(0);      // Fill with zeros after copying all samples from CSV file
            }

            // Redraw the line1.
            d3.select(this)
                .attr("d", line3)
                .attr("transform", null);

            // Adjust axis
            y3.domain([d3.min(channel_data_3, function (d) { return d; }), d3.max(channel_data_3, function (d) { return d; })]);

            // Slide it to the left.
            d3.active(this)
                .attr("transform", "translate(" + x(0) + ",0)")
                .transition()
                .on("start", tick3);

            // Pop the old data point off the front.
            channel_data_3.shift();

        }

        var optional = $("#optional");
        optional.append('<button id="pause">暂停</button><button id="review">重新播放</button><br /><button id="fft">频谱图</button><button id="area">选择区域</button><br />')

        //暂停/继续
        var pause = document.getElementById("pause");
        pause.addEventListener("click", function () {
            if (pause.innerHTML == "暂停") {
                transition1.interrupt();
                transition2.interrupt();
                transition3.interrupt();
                pause.innerHTML = "继续"
            } else {
                transition1.transition().duration(animation_refresh_rate).on("start", tick);
                transition2.transition().duration(animation_refresh_rate).on("start", tick2);
                transition3.transition().duration(animation_refresh_rate).on("start", tick3);
                pause.innerHTML = "暂停"
            }
        })

        //重新播放
        var review = document.getElementById("review");
        review.addEventListener("click", function () {
            for (var sample = 0; sample < data_sampling_rate; sample++) {
                channel_data_1[sample] = data[sample].Ch_1;
                channel_data_2[sample] = data[sample].Ch_2;
                channel_data_3[sample] = data[sample].Ch_3;
            }

            sample_index_1 = data_sampling_rate;
            sample_index_2 = data_sampling_rate;
            sample_index_3 = data_sampling_rate;
        })

        //频谱图
        var fft = document.getElementById("fft");
        fft.addEventListener("click", function () {
            var fftDomain = $("#fftDomain");
            fftDomain.append('<img src = "/py/fft.png" width = "50%">');
        })

        //圈选指标
        var area = document.getElementById("area");
        var rectHover = svg.append("rect")
            .attr("class", "overlay")
            .attr("width", svg.attr("width"))
            .attr("height", svg.attr("height"))
        var clickTime = 0;
        var xStart, xEnd;
        function mousedown() {
            var mouseX = d3.mouse(this)[0];
            var line = [[mouseX, 0], [mouseX, svg.attr("height")]];
            var linePath = d3.line();
            if (clickTime == 0) {
                // var mouseY = d3.mouse(this)[1] - padding.top;
                svg.append("path")
                    .attr("d", linePath(line))
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("fill", "none")
                    .attr("class", "mark")
                svg.append("text")
                    .attr("fill", "black")
                    .attr("font-size", "14px")
                    .attr("text-anchor", "middle")
                    .attr("x", mouseX)
                    .attr("y", 0)
                    .attr("dx", 10)
                    .attr("dy", 20)
                    .text("start")
                    .attr("class", "mark")
                xStart = mouseX;
            }
            else if (clickTime == 1) {
                console.log("end")
                svg.append("path")
                    .attr("d", linePath(line))
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("fill", "none")
                    .attr("class", "mark")
                svg.append("text")
                    .attr("fill", "black")
                    .attr("font-size", "14px")
                    .attr("text-anchor", "middle")
                    .attr("x", mouseX)
                    .attr("y", 0)
                    .attr("dx", 10)
                    .attr("dy", 20)
                    .text("end")
                    .attr("class", "mark")
                xEnd = mouseX;

                //区域数据的获取
                var areaStart = x.invert(xStart - padding.left),
                    areaEnd = x.invert(xEnd - padding.left),
                    currentSampleStart = sample_index_1 - 128 + parseInt(areaStart),
                    currentSampleEnd = sample_index_1 - 128 + parseInt(areaEnd),
                    i, areaData = {
                        'Ch_1': [],
                        'Ch_2': [],
                        'Ch_3': [],
                        'Ch_4': [],
                    };
                for (i = currentSampleStart; i <= currentSampleEnd; i++) {
                    areaData.Ch_1.push(data[i].Ch_1);
                    areaData.Ch_2.push(data[i].Ch_2);
                    areaData.Ch_3.push(data[i].Ch_3);
                    areaData.Ch_4.push(data[i].Ch_4);
                }

                //缩放
                var scale = document.getElementById("scale");
                //根据index拿到数据，利用D3 API进行缩放
                scale.addEventListener("click", function () {
                    //实现缩放
                    var body = $("body");
                    body.append('<div class="dialog" id="dialogScale"><p>请选择要分析的通道:</p><select id="selectScale" class="select"><option value="Ch_1">Ch_1</option><option value="Ch_2">Ch_2</option><option value="Ch_3">Ch_3</option><option value="Ch_4">Ch_4</option></select><div class="btn"><input type="button" id="confirmScale" value="确定" /><input type="button" id="cancelScale" value="取消" /></div></div>');
                    var scaleSvgTime = 0;
                    $("#confirmScale").click(function () {
                        var option = $("#selectScale option:selected").val(),
                            data = areaData[option];
                        if (scaleSvgTime == 0) {
                            var svgScale = d3.select("#graph")
                                .append("svg")
                                .attr("height", (height + padding.top + padding.bottom))
                                .attr("width", width)
                                .attr("id", "scaleSvg");
                            scaleSvgTime++;
                        } else {
                            var svgScale = $("#scaleSvg");
                        }
                        //绘制单通道指标数据
                        var xScale = d3.scaleLinear()
                            .domain([1, currentSampleEnd - currentSampleStart + 1])
                            .range([0, width]);

                        var yScale = d3.scaleLinear()
                            .domain([d3.min(data, function (d) { return d; }), d3.max(data, function (d) { return d; })])
                            .range([height, 0]);

                        var lineScale = d3.line()
                            .curve(d3.curveBasis)
                            .x(function (d, i) { return xScale(i); })
                            .y(function (d, i) { return yScale(d); });
                        var gScale = svgScale.append("g").attr("transform", "translate(" + padding.left + "," + padding.top + ")");

                        gScale.append("text")
                            .attr("fill", "red")
                            .attr("font-size", "14px")
                            .attr("text-anchor", "middle")
                            .attr("x", 20)
                            .attr("y", 0)
                            .text(option)

                        gScale.append("defs").append("clipPath")
                            .attr("id", "clip")
                            .append("rect")
                            .attr("width", width)
                            .attr("height", height)

                        gScale.append("g")
                            .attr("class", "axis axis--x")
                            .attr("transform", "translate(0," + y(0) + ")")
                            .call(d3.axisBottom(x));

                        gScale.append("g")
                            .attr("class", "axis axis--y")
                            .call(d3.axisLeft(y));
                        gScale.append("g")
                            // .attr("transform", "translate(0," + y(0) + ")")
                            .attr("clip-path", "url(#clip)")
                            .append("path")
                            .attr("d",lineScale(data))
                            .attr("class", "line");
                        $('#dialogScale').hide();
                        //缩放
                    });
                    $('#cancelScale').click(function () {
                        $('#dialogScale').hide();
                    });
                })

                //数据标注
                var mark = document.getElementById("mark");
                mark.addEventListener("click", function () {
                    var body = $("body");
                    body.append('<div class="dialog" id="dialog"><p>请选择要分析的通道:</p><select id="select" class="select"><option value="Ch_1">Ch_1</option><option value="Ch_2">Ch_2</option><option value="Ch_3">Ch_3</option><option value="Ch_4">Ch_4</option></select><p>分析后的特征值:</p><input type="text" style="width: 100%;" id="addText" /><div class="btn"><input type="button" id="confirm" value="确定" /><input type="button" id="cancel" value="取消" /></div></div>');
                    $('#confirm').click(function () {
                        var option = $("#select option:selected").val(),
                            text = $("#addText").val();
                        $.ajax({
                            type: 'post',
                            url: 'http://127.0.0.1:8800/save',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify({
                                dataSource: text + ',' + areaData[option]
                            }),
                            success: function (res) {
                                console.log(res)
                            }
                        });
                        $('#dialog').hide();
                    });
                    $('#cancel').click(function () {
                        $('#dialog').hide();
                    });
                })
            } else {
                console.log("retry")
            }
            clickTime++;
        }
        area.addEventListener("click", function () {
            if (area.innerHTML == "选择区域") {
                area.innerHTML = "重新/继续选择区域";
                var optional = $("#optional");
                optional.append('<button id="scale">缩放</button><button id="mark">标注</button>')
            }
            else {
                clickTime = 0;
                d3.selectAll(".mark").remove();
            }
            var focusLine = svg.append("g").style("display", "none")
            var vLine = focusLine.append("line");
            rectHover.on("mouseover", function () {
                var mouseX = d3.mouse(this)[0];
                focusLine.style("display", null)
                vLine.attr("x1", mouseX)
                    .attr("y1", 0)
                    .attr("x2", mouseX)
                    .attr("y2", svg.attr("height"))
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("fill", "none");
            })
                .on("mousedown", mousedown)
                .on("mousemove", function () {
                    var mouseX = d3.mouse(this)[0];
                    vLine.attr("x1", mouseX).attr("x2", mouseX);
                })
                .on("mouseout", function () {
                    focusLine.style("display", "none")
                })
        })

    });
})()