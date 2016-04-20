/* jshint esversion:6 */
app.factory('sqlService', function($cordovaSQLite) {
	//define db instance 
	var service = {}, db = null;

	let popQrys = {};
	popQrys.mood_logs = [
		'DROP TABLE IF EXISTS mood_logs',
		'CREATE TABLE mood_logs(id INTEGER PRIMARY KEY NOT NULL,message TEXT NOT NULL)'
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

	const populate = () => {
		return new Promise((resolve, reject) => {
			if(db === null) reject("DB connection not initiated. Call init() before running queries.");

			db.sqlBatch([
			  ...popQrys.pattern_features,
			  ...popQrys.mood_logs
			], (error) => {
				if(error) reject(error);
				db.executeSql('INSERT INTO mood_logs (message) VALUES (?)', ['this is a mood log blah blah blah'], (resultSet) => {
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