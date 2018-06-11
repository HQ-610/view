(function () {
    d3.csv("../data/sample_data.csv", function (error, data) {
        if (error) throw error;
        var channel_data = {};
        var total = 0;
        data.columns.forEach(function (item) {
            channel_data[item] = [];
            total++;
        })
        data.forEach(function (d) {
            data.columns.forEach(function (item) {
                d[item] = +d[item];
            })
        });

        var data_sampling_rate = 128;
        var data_number_samples = data.length;
        var animation_refresh_rate = 30;

        for (var sample = 0; sample < data_sampling_rate; sample++) {
            data.columns.forEach(function (item) {
                channel_data[item].push(data[sample][item]);
            })
        }
        data.columns.forEach(function (item) {
            channel_data["sample_" + item] = data_sampling_rate;
        })
        console.log(channel_data);

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
        function single(item, index) {
            if (item != "Sample") {
                var x = d3.scaleLinear()
                    .domain([1, data_sampling_rate])
                    .range([0, width]);

                var y = d3.scaleLinear()
                    .domain([d3.min(channel_data[item], function (d) { return d; }), d3.max(channel_data[item], function (d) { return d; })])
                    .range([height, 0]);

                var line = d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d, i) { return x(i); })
                    .y(function (d, i) { return y(d); });
                var g = svg.append("g").attr("transform", "translate(" + padding.left + "," + (padding.top + index * height) + ")");
                g.append("text")
                    .attr("fill", "red")
                    .attr("font-size", "14px")
                    .attr("text-anchor", "middle")
                    .attr("x", 20)
                    .attr("y", 0)
                    .attr("transform", "translate(0," + (index + 1) * y(0) + ")")
                    .text(item);
                g.append("defs").append("clipPath")
                    .attr("id", "clip")
                    .append("rect")
                    .attr("width", width)
                    .attr("height", height)

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + (index + 1) * y(0) + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("class", "axis axis--y")
                    .attr("transform", "translate(0," + index * y(0) + ")")
                    .call(d3.axisLeft(y));

                this.transition = g.append("g")
                    .attr("clip-path", "url(#clip)")
                    .attr("transform", "translate(0," + index * y(0) + ")")
                    .append("path")
                    .datum(channel_data[item])
                    .attr("class", "line");
                this.transition.transition()
                    .duration(animation_refresh_rate)
                    .ease(d3.easeLinear)
                    .on("start", tick);
                // Update function, called on each transition
                this.tick = function() {

                    // Update sample index and push a new data sample
                    var sample_index = channel_data["sample_" + item]++;

                    if (sample_index < data_number_samples) {
                        channel_data[item].push(data[sample_index][item]);
                    }
                    else {
                        channel_data[item].push(0);      // Fill with zeros after copying all samples from CSV file
                    }

                    // Redraw the line.
                    d3.select(this)
                        .attr("d", line)
                        .attr("transform", null);

                    // Adjust axis
                    y.domain([d3.min(channel_data[item], function (d) { return d; }), d3.max(channel_data[item], function (d) { return d; })]);

                    // Slide it to the left.
                    d3.active(this)
                        .attr("transform", "translate(" + x(0) + ",0)")
                        .transition()
                        .on("start", tick);

                    // Pop the old data point off the front.
                    channel_data[item].shift();

                } // End of Tick function
            }
        }
        var timeDomainTransition = [];
        data.columns.forEach(function (item, index) {
            timeDomainTransition[index] = new single(item, index);
        })
        //暂停/继续
        var pause = document.getElementById("pause");
        pause.addEventListener("click", function () {
            if (pause.innerHTML == "暂停") {
                for (var i = 0; i < timeDomainTransition.length; i++)
                    timeDomainTransition[i].transition.interrupt();
                pause.innerHTML = "继续"
            } else {
                for (var i = 0; i < timeDomainTransition.length; i++)
                    timeDomainTransition[i].transition.transition().duration(animation_refresh_rate).on("start", timeDomainTransition[i].tick);
                pause.innerHTML = "暂停"
            }
        })

        //重新播放
        var review = document.getElementById("review");
        review.addEventListener("click", function () {
            for (var sample = 0; sample < data_sampling_rate; sample++) {
                data.columns.forEach(function (item) {
                    channel_data[item].push(data[sample][item]);
                    channel_data["sample_" + item] = data_sampling_rate;
                })
            }
        })
    })
})()