var mysql = require('mysql');
    var mySQLString = "START TRANSACTION;";

   var connection = mysql.createConnection({
        host: '41.185.27.253',
        user: 'iot_Admin',
        password: '<r0(k>IOT',
        database: 'IOT',
        multipleStatements: true
    });

mySQLString += 'INSERT INTO case_files (description,name,email,contact_number,systemID,status) VALUES ( "' + myJSON.issue.replace('"','') +  '","' + myJSON.client +  '","' + myJSON.email +  '","' + myJSON.phone +  '","' + myJSON.system +  '","' + myJSON.status +  '");';
    
   console.log(mySQLString);
    putInSQL();
    
   function putInSQL() {
        mySQLString += "COMMIT;"
    
       //connection.connect();
    
       connection.query(mySQLString, function (error, results, fields) {
    
           if (error) throw error;
            console.log('INSERTED TO MYSQL');
    
       });
    
       mySQLString = "";
        mySQLString = "START TRANSACTION;"
    
   }
    connection.end();
};


