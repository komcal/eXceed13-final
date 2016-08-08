var information = [];
$.ajax({
  // url: 'http://10.32.176.4/xplusequal13-all-data'
  url: 'http://localhost:8080/logs'
})
.success(function(data) {
  var d = data.split('*');
  console.log(d);
  d.map(function(log) {
    if(log !== "") {
      var a = log.split(',');
      // a.shift(); //only in localhost
      console.log(a);
      if(a[0] === "") a.shift();
      information[0] = a[0];
      information[1] = (information[1]) ? (information[1]+a)/2 : a[1]
      information[2] = a[2]
      information[3] = (information[3]) ? (information[3]+a)/2 : a[3]
      information[4] = (information[4]) ? (information[4]+a)/2 : a[4]
      information[5] = (information[5]) ? (information[5]+a)/2 : a[5]
    }
  })
  var time = new Date();
  var place = information[0].split(' ');
  $('#place').html('Place: '+place[0]);
  $('#adress').html('Adress: '+information[0]);
  if(!information[1]) information[1] = 24;
  $('#one').html(information[1]);
  $('#two').html(information[2]);
  if(!information[3]) information[3] = 20;
  $('#three').html(information[3]);
  if(!information[4]) information[4] = 35;
  $('#four').html(information[4]);
  if(!information[5]) information[5] = 0;
  $('#five').html(information[5]);
  $('#time').html('Time: '+time);
  console.log(information);
	var chart = new CanvasJS.Chart("chartContainer", {
		theme: "theme2",//theme1
		title:{
			text: "Chart"
		},
		animationEnabled: false,   // change to true
		data: [
		{
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "column",
			dataPoints: [
				{ label: "Temp (celsius)",  y: parseInt(information[1])  },
				{ label: "Humid (%)", y: parseInt(information[3])  },
				{ label: "Smoke (ppm)", y: parseInt(information[4])  },
				{ label: "Gas (ppm)",  y: parseInt(information[5])  },
			]
		}
		]
	});
	chart.render();
});
$.ajax({
  url: 'http://localhost:8080/fire/get'
})
.success(function(data) {
  $('#seven').html(data);
})
$.ajax({
  url: 'http://localhost:8080/spinker/get'
})
.success(function(data) {
  $('#eight').html(data);
})