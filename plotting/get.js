function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//      console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  //var month = months[a.getMonth()];
  var month = a.getMonth()+1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


var heightRef = 200; // cm

var urlParams = new URLSearchParams(window.location.search);

var limit = 3000;

var param_limit = urlParams.get('limit');

if (param_limit !== null) {
limit = parseInt(param_limit);
}


var base_url = 'http://64.227.0.108:8700/api/latest'
var fetch_url = base_url;



	 //fetch('http://localhost:8000/api/users/')
//fetch('http://64.227.0.108:8100/api/user/latest')
fetch(fetch_url)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    //console.log("hallo");
    //console.log(myJson);

var data = myJson.data;
var xvals = [];	  
var timestamp = [];
var distance = [];
	  var BatV = [];
var deviceName = [];
var rssi = [];

// get the data
for (i in data) {
	if (data[i].id > 1) {
  //xvals.push(i);
  //xvals.push(data[i].id);
//  xvals.push(data[i].id);
  xvals.push(timeConverter(data[i].dateTime));
  timestamp.push(data[i].dateTime);
  distance.push(heightRef - data[i].distance);
  rssi.push(data[i].rssi);
  BatV.push(data[i].BatV);
	}
}

// flip b/c of way we got the data form sql:
xvals=xvals.reverse();
timestamp=timestamp.reverse();
distance=distance.reverse();
BatV=BatV.reverse();
rssi=rssi.reverse();

//console.log(xvals);
//console.log(xvals.length);
// reference for plotly graphing: https://plot.ly/javascript/line-and-scatter/
// example for plotly graphing in a page: https://codepen.io/pen/?&editable=true
// reference for styles: https://plot.ly/javascript/line-and-scatter/

//console.log(xvals);
//console.log(temp);

var distance_points = [];
var BatV_points = [];
var rssi_points = [];
for (var i=0; i<distance.length && i<xvals.length; i++) {

	distance_points[i]= {t:xvals[i],y:distance[i]};
BatV_points[i] = {t:xvals[i],y:BatV[i]};

 rssi_points[i]= {t:xvals[i],y:rssi[i]};

// temp_points[i]= {t:new Date(xvals[i]),y:temp[i]};
}


var ctx_distance = document.getElementById('distanceChart').getContext('2d');
var distanceChart = new Chart(ctx_distance, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
	    borderColor: "green",
            pointRadius: 1,
   backgroundColor: "green",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "green",
   pointBorderColor: "green",
   pointHoverBackgroundColor: "green",
   pointHoverBorderColor: "green",
      label: '[ 200 cm - rangefinder distance (cm) ]',
	    fill: false,
      data: distance_points,
      borderWidth: 1
    }
    ]
  },
  options: {
	  legend: {
            display: true,
		  //position: 'right',
        },
	  title: {
            display: true,
            text: 'Maxbotix Ultrasonic Rangefinder'
        },
	  responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
	time: {
		//format: "HH:MM:SS",
		//unit: 'day',
		//minUnit: 'hour',
	}
      }],
	    yAxes: [{
                ticks: {
                    suggestedMin: 20,
                    suggestedMax: 200 
                }
            }]
    }
  }
});

var ctx_battery = document.getElementById('batteryChart').getContext('2d');
var batteryChart = new Chart(ctx_battery, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
            borderColor: "red",
            pointRadius: 1,
   backgroundColor: "red",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "red",
   pointBorderColor: "red",
   pointHoverBackgroundColor: "red",
   pointHoverBorderColor: "red",
      label: 'Battery (V)',
            fill: false,
      data: BatV_points,
      borderWidth: 1
    }
    ]
  },
  options: {
          legend: {
            display: true,
                  //position: 'right',
        },
          title: {
            display: true,
            text: 'Solar-recharged battery Level'
        },
          responsive:false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
                //format: "HH:MM:SS",
                //unit: 'day',
                //minUnit: 'hour',
        }
      }],
            yAxes: [{
                ticks: {
                    suggestedMin: 3,
                    suggestedMax: 5 
                }
            }]
    }
  }
});



var ctx_rssi = document.getElementById('rssiChart').getContext('2d');
var rssiChart = new Chart(ctx_rssi, {
  type: 'line',
  data: {
    labels: xvals,
    datasets: [{
     borderColor: "pink",
            pointRadius: 1,
   backgroundColor: "pink",
   //pointBackgroundColor: "#55bae7",
   pointBackgroundColor: "blue",
   pointBorderColor: "blue",
   pointHoverBackgroundColor: "blue",
   pointHoverBorderColor: "blue",
	    label: 'RSSI (dB)',
      data: rssi_points,
      borderWidth: 1
    }]
  },
  options: {
          responsive:true,
	  maintainAspectRatio: true,
    scales: {
      xAxes: [{
        type: 'time',
        /*time: {
                unit: 'hour'
        }*/
      }]
    }
  }
});





});



