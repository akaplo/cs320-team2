/* jshint esversion:6 */
app.factory('sqlService', function($cordovaSQLite) {
	//define db instance
	var service = {}, db = null;

	let popQrys = {};

	popQrys.mood_logs = [
		// 'DROP TABLE IF EXISTS mood_logs',
		'CREATE TABLE IF NOT EXISTS mood_logs(id INTEGER PRIMARY KEY NOT NULL,\
		mood TEXT NOT NULL, intensity INTEGER NOT NULL, trigger TEXT NOT NULL, behavior TEXT NOT NULL, belief TEXT NOT NULL)',
		'INSERT OR REPLACE INTO mood_logs (id, mood, intensity, trigger, behavior, belief) VALUES\
		(0, "angry", "10", "gordon anderson", "bought wrench", "wrenches fix stuff"),\
		(1, "disgust", "6", "gordon anderson", "bought wrench", "wrenches fix stuff")'
	];

	popQrys.pattern_features = [
		'CREATE TABLE IF NOT EXISTS pattern_features(\
		id INTEGER PRIMARY KEY NOT NULL,\
		word TEXT NOT NULL UNIQUE,\
		anger_trigger_theta REAL NOT NULL DEFAULT 0,\
		disgust_trigger_theta REAL NOT NULL DEFAULT 0,\
		fear_trigger_theta REAL NOT NULL DEFAULT 0,\
		happiness_trigger_theta REAL NOT NULL DEFAULT 0,\
		sadness_trigger_theta REAL NOT NULL DEFAULT 0,\
		surprise_trigger_theta REAL NOT NULL DEFAULT 0,\
		anger_belief_theta REAL NOT NULL DEFAULT 0,\
		disgust_belief_theta REAL NOT NULL DEFAULT 0,\
		fear_belief_theta REAL NOT NULL DEFAULT 0,\
		happiness_belief_theta REAL NOT NULL DEFAULT 0,\
		sadness_belief_theta REAL NOT NULL DEFAULT 0,\
		surprise_belief_theta REAL NOT NULL DEFAULT 0,\
		anger_behavior_theta REAL NOT NULL DEFAULT 0,\
		disgust_behavior_theta REAL NOT NULL DEFAULT 0,\
		fear_behavior_theta REAL NOT NULL DEFAULT 0,\
		happiness_behavior_theta REAL NOT NULL DEFAULT 0,\
		sadness_behavior_theta REAL NOT NULL DEFAULT 0,\
		surprise_behavior_theta REAL NOT NULL DEFAULT 0)'
	];

	popQrys.patterns = [
		'CREATE TABLE IF NOT EXISTS patterns(\
		id INTEGER PRIMARY KEY NOT NULL,\
	  	word TEXT NOT NULL UNIQUE,\
	  	mood TEXT NOT NULL,\
	  	origin TEXT NOT NULL,\
	  	strength REAL NOT NULL DEFAULT 0)'
	];

	popQrys.feedback = [
		// 'DROP TABLE IF EXISTS feedback',
		'CREATE TABLE IF NOT EXISTS feedback( name TEXT PRIMARY KEY, response INTEGER NOT NULL )',
		'INSERT OR REPLACE INTO feedback (name, response) VALUES\
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
		'CREATE TABLE IF NOT EXISTS preferences_table(\
		id INTEGER PRIMARY KEY NOT NULL,\
		name TEXT NOT NULL,\
		password TEXT NOT NULL,\
		contact TEXT NOT NULL,\
		backgroundURL TEXT NOT NULL,\
		reminderRate INTEGER NOT NULL DEFAULT 86400000)',
		`INSERT OR REPLACE INTO preferences_table (name, password, contact, backgroundURL, reminderRate) VALUES ('John', 'password123' ,'idk@idk.com', 'http://abcnews.go.com/images/Lifestyle/GTY_yawning_dog_dm_130807.jpg', 86400000)`
	];


	const populate = () => {
		return new Promise((resolve, reject) => {
			if(db === null) reject("DB connection not initiated. Call init() before running queries.");

			db.sqlBatch([
			  ...popQrys.pattern_features,
				...popQrys.patterns,
			  ...popQrys.mood_logs,
			  ...popQrys.feedback,
			  ...popQrys.preferences_table
			], (error) => {
				if(error) return reject(error);
				return resolve();
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
				console.log("DB initializing...");
				//instantiate db with cordova
				db = window.sqlitePlugin.openDatabase({name: 'moodlogger.db', location: 'default', androidLockWorkaround: 1});
				populate().then((res) => resolve(res), (err) => reject(err));
			} else {
				console.log("DB already initialized");
				resolve();
			}
		});
	}

	/* utils */
	const toArray = (resultSet) => {
		let arr = [];
		for(let i = 0; i < resultSet.rows.length; ++i) arr.push(resultSet.rows.item(i));
		return arr;
	};

	/*
	** Returns all fields in a specified table
	** Args: table ( name of a table, String )
	** Returns: Promise sucess(resultSet), error(error)
	*/
	service.viewTable = (table, asArray) => {
		return new Promise((resolve, reject) => {
			const viewTable = () => {
				db.executeSql(`SELECT * FROM ${table}`, [], (resultSet) => {
					if(asArray) resolve(toArray(resultSet));
					else resolve(resultSet);
				}, (error) => reject(error));
			}
			if(db === null){
				service.init().then((res) => viewTable(), (err) => reject(err));
			} else return viewTable();
		});
	}

	/*
	** Executes query and returns result or an error object
	** Args: qry ( an SQL query, String )
	** Returns: Promise sucess(resultSet), error(error)
	*/
	service.executeQuery = (qry, asArray) => {
		return new Promise((resolve, reject) => {
			const executeQuery = () => {
				db.executeSql(qry, [], (resultSet) => {
					if(asArray) resolve(toArray(resultSet));
					else resolve(resultSet);
				}, (error) => reject(error));
			}
			if(db === null){
				service.init().then((res) => executeQuery(), (err) => reject(err));
			} else return executeQuery();
		});
	}

	return service;
});
