var moment = require('moment');
var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        console.log('hooray');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dateTime INTEGER,
	    timestamp TEXT, 
	    distance FLOAT(8,4),
	    BatV FLOAT(8,4), 
	    deviceName TEXT,
	    devEUI TEXT,
	    rssi FLOAT(2,2)
            )`,(err) => {
        if (err) {
            // Table already created
            console.log("already created");
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO user (dateTime,timestamp,distance,BatV,deviceName,devEUI,rssi) VALUES (?,?,?,?,?,?,?)'
	    var date = new Date();
            var ts = Math.round(( date ).getTime() / 1000);
	    var timestamper = moment().format();
            db.run(insert, [ts,timestamper,0.0,0.0,0.0,0.0,0.0])
            //db.run(insert, [12123124,19.2,23.2])
        }
    })  
    }
})


module.exports = db

