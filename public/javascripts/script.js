/**
 * Created by luh on 12/21/16.
 */


var selected_graph = [0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0
                      ];
var second = 0;
var cID = window.location.href.split("/")[window.location.href.split("/").length-1];
cID = +cID;
var x_name;
var y_name;

function gup( name )
{
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}

function decode(strToDecode)
{
  var encoded = strToDecode;
  return unescape(encoded.replace(/\+/g,  " "));
}

function generateGraphs_line(index) {

	//**MODIFY HERE HARD-CODED
	//**MODIFY HERE HARD-CODED
	//**MODIFY HERE HARD-CODED
	var attributes = index_attributes[0];
	
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 400 - margin.left - margin.right,
        height = 220 - margin.top - margin.bottom;
    
    x_name = attributes.x;
	y_name = attributes.y;

// Parse the date / time
//var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5).tickFormat(d3.format("d"));

// Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

// Adds the svg canvas
//var data_lst = ["data1.csv", "data2.csv"]


    for (let i = 0; i<15; i++) {

        (function(){ var svg = d3.select("#graph_"+i)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
            d3.csv("/assets/data/"+index+"/"+i+".csv", function(error, data) {
                data.forEach(function(d) {
                    d.x = +d.x;
                    d.y = +d.y;
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.x; }));
                y.domain([0, d3.max(data, function(d) { return d.y; })]);

                // Add the valueline path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("d", valueline(data));

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
                
                svg.append("text")
                	.style("text-anchor","middle")
                	.attr("transform","translate("+-(4*margin.left/5)+","+(height/2)+")rotate(-90)")
//                	.text(attributes.y[Math.floor(i/3)%3]);
                	.text('y');
                
                svg.append("text")
            		.style("text-anchor","middle")
            		.attr("transform","translate("+(width/2)+","+(height+(margin.bottom))+")")
//            		.text(attributes.x[Math.floor(i/3)%3]);
                	.text('x');
                
                svg.append("text")
                .attr("class", "title")
                .attr("x", width / 2 )
                .attr("y", 0)
                .style("text-anchor", "middle")
//                .text(attributes.z_arry[i]);

            });

        })();

    }

}

function randomGraphGenerator(index) {

	//**MODIFY HERE HARD-CODED
	//**MODIFY HERE HARD-CODED
	//**MODIFY HERE HARD-CODED
	index_arr = index.split("/")
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;
// Set the ranges
	var x = d3.scale.linear().rangeRound([0, width]);
	var y = d3.scale.linear().rangeRound([height, 0]);
// Define the axes
	var formatxAxis = d3.format('.0f');
	
	var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
// Define the line
	var valueline = d3.svg.line()
		.x(function(d) { return x(d.x); })
		.y(function(d) { return y(d.y); });
    
// Adds the svg canvas


// Adds the svg canvas
//var data_lst = ["data1.csv", "data2.csv"]


    for (let i = 0; i<3; i++) {

        (function(){ 
        	
        	var svg = d3.select("#graph_"+i)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");
        	

// Get the data
            d3.csv("/assets/data/"+"sdl_sample"+"/"+index_arr[i]+".csv", function(error, data) {
                data.forEach(function(d) {
                    d.x = +d.x;
                    d.y = +d.y;
                });
                var xAxis = d3.svg.axis().scale(x)
                .orient("bottom").ticks(5);
                // Scale the range of the data
                x.domain([0, d3.max(data, function(d) { return d.x; })]);
                y.domain([0, d3.max(data, function(d) { return d.y; })]);

                // Add the valueline path.
                svg.append("path")
                    .attr("class", "line")
                    .attr("d", valueline(data));
                
//                svg.selectAll("dot")
//                	.data(data)
//                	.enter().append("circle")
//                	.attr("r", 3.5)
//                	.attr("cx", function(d) { return x(d.x); })
//                	.attr("cy", function(d) { return y(d.y); });

                // Add the X Axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                // Add the Y Axis
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
                
                /*svg.append("text")
                	.style("text-anchor","middle")
                	.attr("transform","translate("+-(4*margin.left/5)+","+(height/2)+")rotate(-90)")
                	.text(attributes.y[Math.floor(i/3)%3]);
                
                svg.append("text")
            		.style("text-anchor","middle")
            		.attr("transform","translate("+(width/2)+","+(height+(margin.bottom)*(1/2))+")")
            		.text(attributes.x[Math.floor(i/3)%3]);
                */
                svg.append("text")
                .attr("class", "title")
                .attr("x", width / 2 )
                .attr("y", 0)
                .style("text-anchor", "middle")
                .text("Figure "+(i+1));

            });

        })();

    }

}


function generateGraphs_scatter(index){
	
	//**MODIFY HERE HARD-CODED
	//**MODIFY HERE HARD-CODED
	//**MODIFY HERE HARD-CODED
	var attributes = index_attributes[0];
	x_name = attributes.x;
	y_name = attributes.y;
	
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 400 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom;

// Parse the x / x
//var parsex = d3.x.format("%d-%b-%y").parse;

// Set the ranges
	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom").ticks(5);
	
	var yAxis = d3.svg.axis().scale(y)
	    .orient("left").ticks(5);
	
	// Define the line
	var valueline = d3.svg.line()
	    .x(function(d) { return x(d.x); })
	    .y(function(d) { return y(d.y); });
	    
	// Adds the svg canvas
	
	for(let i =0; i<15; i++) {
		
		(function(){
	
			var svg = d3.select("#graph_"+i)
		    	.append("svg")
		        .attr("width", width + margin.left + margin.right)
		        .attr("height", height + margin.top + margin.bottom)
		    	.append("g")
		        .attr("transform", 
		              "translate(" + margin.left + "," + margin.top + ")");
	
		// Get the data
			d3.csv("/assets/data/"+index+"/"+i+".csv", function(error, data) {
			    data.forEach(function(d) {
			        d.x = +d.x;
			        d.y = +d.y;
			    });
	
		    // Scale the range of the data
		    x.domain(d3.extent(data, function(d) { return d.x; }));
		    y.domain(d3.extent(data, function(d) { return d.y; }));
	
		    // Add the valueline path.
		    svg.append("path")
		        .attr("class", "line")
		        .attr("d", valueline(data));
	
		    // Add the scatterplot
		    svg.selectAll("dot")
		        .data(data)
		      .enter().append("circle")
		        .attr("r", 3.5)
		        .attr("cx", function(d) { return x(d.x); })
		        .attr("cy", function(d) { return y(d.y); });
	
		    // Add the X Axis
		    svg.append("g")
		        .attr("class", "x axis")
		        .attr("transform", "translate(0," + height + ")")
		        .call(xAxis);
	
		    // Add the Y Axis
		    svg.append("g")
		        .attr("class", "y axis")
		        .call(yAxis);
		    
		    svg.append("text")
	        	.style("text-anchor","middle")
	        	.attr("transform","translate("+-(4*margin.left/5)+","+(height/2)+")rotate(-90)")
	        	.text(attributes.y);
        
	        svg.append("text")
	    		.style("text-anchor","middle")
	    		.attr("transform","translate("+(width/2)+","+(height+(margin.bottom))+")")
	    		.text(attributes.x);
        
	        svg.append("text")
		        .attr("x", width / 2 )
		        .attr("y", 0)
		        .style("text-anchor", "middle")
		        .text(attributes.z_arry[i]);
				});
	
		})();
		
	}
}

function selectStep1(index){
    var index_arry = index.split("_");

    for (let i =0; i<index_arry.length; i++) {
        (function(){
            $("#graph_" + index_arry[i]).addClass("selected_once");
            selected_graph[+index_arry[i]]++;
        })();
    }

}

function selectStep1_p(index){
    var index_arry = index.split("_");

    for (let i =0; i<index_arry.length; i++) {
        (function(){
            $("#p_" + index_arry[i]).addClass("selected_once");
            selected_graph[+index_arry[i]]++;
        })();
    }

}

function selectStep2(index){
    var index_arry = index.split("_");

    for (let i =0; i<index_arry.length; i++) {
        (function(){
            $("#graph_" + index_arry[i]).removeClass("selected_once").attr("class", "selected_twice");
            selected_graph[+index_arry[i]] = 2;
        })();
    }

    second = 1;
}

function selectStep2_p(index){
    var index_arry = index.split("_");

    for (let i =0; i<index_arry.length; i++) {
        (function(){
            $("#p_" + index_arry[i]).removeClass("selected_once").attr("class", "selected_twice");
            selected_graph[+index_arry[i]] = 2;
        })();
    }

    second = 1;
}

function checkquery(){
	
	var message = "Invalid Input: "
	
	if(!$("#query1").val()) { 
		alert(message+"Empty string [query 1]");
		return 0;
	}
	
	if(second && !$("#query2").val()) {
		alert(message+"Empty string [query 2]");
		return 0;
	}
	
	if(!$("#query1").val().toLowerCase().includes(x_name.toLowerCase())) {
		alert(message+"Name of x-axis missing [query 1]");
		return 0;
	}
	
	if(!$("#query1").val().toLowerCase().includes(y_name.toLowerCase())) {
		alert(message+"Name of y-axis missing [query 1]");
		return 0;
	}
	
	if(second && !$("#query2").val().toLowerCase().includes(x_name.toLowerCase())) {
		alert(message+"Name of x-axis missing [query 2]");
		return 0;
	}
	
	if(second && !$("#query2").val().toLowerCase().includes(y_name.toLowerCase())) {
		alert(message+"Name of y-axis missing [query 2]");
		return 0;
	}
	
	return 1;
	
}


$(document).ready(function() {
	
    
  
    if (gup('assignmentId') == "ASSIGNMENT_ID_NOT_AVAILABLE")
    {
  // If we're previewing, disable the button and give it a helpful message
  document.getElementById('submitButton').disabled = true;
  document.getElementById('submitButton').value = "You must ACCEPT the HIT before you can submit the results.";
    } else {
        var form = document.getElementById('mturk_form');
   
    }
    //submission handler
    $( "form" ).submit(function( event ) {
        var text = "Query:\xa0\xa0"+$("#query1").val()+"\n";
        var text_step2 = "Query:\xa0\xa0"+$("#query2").val()+"\n";

        var graphs = "Index of selected graphs:\xa0\xa0 /";
        var graphs_step2 = "Index of selected graphs:\xa0\xa0 /";
     
        for (let i = 0; i<selected_graph.length; i++) {
            if(selected_graph[i]) {
                graphs += i + "/";
                if(selected_graph[i] > 1)
                    graphs_step2 += i + "/";
            }
        }
        graphs += "\n\n";
        graphs_step2 += "\n\n";
        var footer = "Your queries have been recorded. The page will be redirected to the next collection.";
        
        if(checkquery() == 0) {
        	event.preventDefault();
        }
        
        else {
        	document.getElementById('assignmentId').value = gup('assignmentId');
        	if (document.referrer && ( document.referrer.indexOf('workersandbox') != -1) ) {
                form.action = "http://workersandbox.mturk.com/mturk/externalSubmit";
            }
  
        	
        	/*myJsRoutes.controllers.Application.saveRecord(cID, $("#query1").val(), $("#query2").val()).ajax({});
            
            if(!second)
                alert(text+graphs+footer);
            else
                alert("STEP1:\n"+text+graphs+"STEP2:\n"+text_step2+graphs_step2+footer);
        	
            event.preventDefault();
            
            var nextpage = parseInt(cID) + 1;
            if(nextpage > 17)
            	nextpage = "final";*/
                
            //window.location = "/"+nextpage;
        }
        
        
    });
    
    

});



(function(){
	
	
})();

