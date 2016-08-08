function rankHr (HR) {
//    console.log(HR);
    if ( HR > 80 ) {
        $('#hrBlock').addClass('animated infinite flash');
        $('#hrBlock').addClass('changeToRed');
    }
    else if (HR<=80 && HR>=74) {
        $('#hrBlock').removeClass('animated infinite flash');
        $('#hrBlock').addClass('changeToYellow');
    }
    else if (HR > 0){
        $('#hrBlock').removeClass('animated infinite flash');
        $('#hrBlock').addClass('changeToGreen');
    }
}

window.onload =function () {
	var chart = new CanvasJS.Chart("graph", {
		title:{
			text:"Heart Rate 24 Hr",fontColor:"white"
		},zoomEnabled: true,backgroundColor:"rgba(0, 0, 0, 0.4)",color:"white",      axisX:{
        labelFontColor: "white",
        labelFontSize:10

      }, axisY:{
      minimum: 50,
      maximum: 150},

		data: data
	});
    chart.render()

    setInterval(function(){
        var ttt=100+Math.random()*20-10+(Math.random()%10==0?50:0)
        ana.setHR(ttt)
        $('#heartRate').html(Math.floor(ttt));
    //    console.log("gened");
        rankHr(ttt);
    //    console.log("yyy");
        var d=new Date()
        chart.options.data[0].dataPoints.push({x:new Date(),y:ttt});
        chart.options.axisX={minimum:(d-1000*60),maximum:d}
    },1000);

}
//= generate();
var y = 0;
var limit =20;
    var data = [];
    var dataSeries = { type: "line" };
    // var dataPoints = [];
    // for (var i = 0; i < limit; i += 1) {
    //     y += (Math.random() * 10 - 5);
    //      dataPoints.push({
    //          //var d=new Date(2010, 11, 11, 10, 1, i, 0);
    //          x: new Date(2012,1,i),
    //       y: y
    //        });
    //     }
    //  dataSeries.dataPoints = dataPoints;
    function fx(item){
        var dt;
        if(typeof item[0]=='string')
        {
            dt=new Date(item[0]);
        }
        else dt=item[0]
        return {
            x:dt,
            y:item[1]
        }
    }
    function fy(item){

        return item[1]

    }
    DB['avg']=math.mean(DB['HHR'].map(fy));
        dataSeries.dataPoints=DB['HLP'].concat(DB['HWC']).concat(DB['HHR']).map(fx);
            //DB['avg']=math.mean(DB['HHR'].map(fy));


//    });
     data.push(dataSeries);
