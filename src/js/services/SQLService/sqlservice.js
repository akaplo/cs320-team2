	/* jshint esversion:6 */
app.factory('sqlService', function($cordovaSQLite) {
	//define db instance
	var service = {}, db = null;

	let popQrys = {};

	popQrys.mood_logs = [
		'DROP TABLE IF EXISTS mood_logs',
		'CREATE TABLE mood_logs(id INTEGER PRIMARY KEY NOT NULL,\
		mood TEXT NOT NULL, intensity INTEGER NOT NULL, trigger TEXT NOT NULL, behavior TEXT NOT NULL, belief TEXT NOT NULL)',
		'INSERT INTO mood_logs (id, mood, intensity, trigger, behavior, belief) VALUES\
		(0, "angry", "10", "gordon anderson", "bought wrench", "wrenches fix stuff"),\
		(1, "disgust", "6", "gordon anderson", "bought wrench", "wrenches fix stuff")'
	];

	popQrys.pattern_features = [
		'DROP TABLE IF EXISTS pattern_features',
		'CREATE TABLE pattern_features(\
		id INTEGER PRIMARY KEY NOT NULL,\
		word TEXT NOT NULL UNIQUE,\
		happy_trigger_theta REAL NOT NULL DEFAULT 0,\
		stressed_trigger_theta REAL NOT NULL DEFAULT 0,\
		happy_belief_theta REAL NOT NULL DEFAULT 0,\
		stressed_belief_theta REAL NOT NULL DEFAULT 0,\
		happy_behavior_theta REAL NOT NULL DEFAULT 0,\
		stressed_behavior_theta REAL NOT NULL DEFAULT 0)',
	];
	popQrys.feedback = [
		'DROP TABLE IF EXISTS feedback',
		'CREATE TABLE feedback( name TEXT PRIMARY KEY, response INTEGER NOT NULL )',
		'INSERT INTO feedback (name, response) VALUES\
		("Watch Spongebob", 1),\
		("Go to the gym", 0),\
		("Call a family member or friend", 1),\
		("Take a bath", 0),\
		("Go for a walk", 0),\
		("Speak with a trusted family member about your day", 0),\
		("Keep being happy!", 0),\
		("Watch television", 1)'
	];

	popQrys.preferences_table = [
		'DROP TABLE IF EXISTS preferences_table',
		'CREATE TABLE preferences_table(\
		id INTEGER PRIMARY KEY NOT NULL,\
		name TEXT NOT NULL,\
		password TEXT NOT NULL,\
		contact TEXT NOT NULL,\
		backgroundURL TEXT NOT NULL,\
		reminderRate INTEGER NOT NULL DEFAULT 86400000)',
		`INSERT INTO preferences_table (name, password, contact, backgroundURL, reminderRate) VALUES ('John', 'password123' ,'idk@idk.com', 'http://vignette2.wikia.nocookie.net/thehungergames/images/4/48/Happy_cat.jpg/revision/latest?cb=20121008044759', 86400000)`
	];


	const populate = () => {
		return new Promise((resolve, reject) => {
			if(db === null) reject("DB connection not initiated. Call init() before running queries.");

			db.sqlBatch([
			  ...popQrys.pattern_features,
			  ...popQrys.mood_logs,
			  ...popQrys.feedback,
			  ...popQrys.preferences_table
			], (error) => {
				if(error) reject(error);
				// just some test data
				db.executeSql(`INSERT INTO mood_logs (mood, intensity, trigger, behavior, belief) VALUES ('my mood', 7, 'some trigger', 'some behavior', 'some belief')`, [], (resultSet) => {
					resolve();
				}, (error) => reject(error));
			}, (error) => {
			  console.log('Populate table error: ' + error.message);
			  reject(error);
			});
		});
	};

	/*
	** Opens a database connection and populates it with our data schemas
	** Returns: Promise sucess(resultSet), error(error)
	*/
	service.init = () => {
		return new Promise((resolve, reject) => {
			if(db === null){
				console.log("DB not ready");
				//instantiate db with cordova
				db = window.sqlitePlugin.openDatabase({name: 'moodlogger.db', location: 'default', androidLockWorkaround: 1});
				populate().then((res) => resolve(res), (err) => reject(err));
			} else {
				console.log("DB ready");
				resolve();
			}
		});
	}

	/*
	** Returns all fields in a specified table
	** Args: table ( name of a table, String )
	** Returns: Promise sucess(resultSet), error(error)
	*/
	service.viewTable = (table) => {
		return new Promise((resolve, reject) => {
			if(db === null) reject("DB connection not initiated. Call init() before running queries.");

			db.executeSql(`SELECT * FROM ${table}`, [], (resultSet) => {
				resolve(resultSet);
			}, (error) => reject(error));
		});
	}

	/*
	** Executes query and returns result or an error object
	** Args: qry ( an SQL query, String )
	** Returns: Promise sucess(resultSet), error(error)
	*/
	service.executeQuery = (qry) => {
		return new Promise((resolve, reject) => {
			if(db === null) reject("DB connection not initiated. Call init() before running queries.");
			db.executeSql(qry, [], (resultSet) => {
				resolve(resultSet);
			}, (error) => reject(error));
		});
	}

	return service;
});
