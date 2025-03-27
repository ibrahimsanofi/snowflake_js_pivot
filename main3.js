
async function getSnowflakeData() {
    // Load the Snowflake Node.js driver.
    var snowflake = require('snowflake-sdk');

    // Create a Connection object that we can use later to connect.
    var connection = snowflake.createConnection({
        account: 'EMEA_DATA',
        username: 'TECH_DCF_PROD_MONITOR_BI',
        password: 'fRTuxK!G*Bhc|HL)|w(fgt~OMaA+8]P^ASdXtw[1',
        warehouse: 'tech_dcf_prod_wh_monitor_bi_proc',
        database: 'TECH_DCF_PROD',
        schema: 'DMT_MONITOR'
    });

    // Connect to Snowflake
    connection.connect((err, conn) => {
        if (err) {
        console.error('Unable to connect: ' + err.message);
        } else {
        console.log('Successfully connected to Snowflake.');
        }
    });

    // Execute a simple query
    connection.execute({
        sqlText: 'SELECT DISTINCT project_name, environment, execution_date, status FROM tech_dcf_prod.dmt_monitor.ma_monitor_job_summary_status',
        complete: (err, stmt, rows) => {
        if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
        } else {
            console.log('Successfully executed statement: ' + stmt.getSqlText());
            console.log('Rows: ', rows);
        }
        }
    });

    // Close connection
    connection.destroy((err, conn) => {
        if (err) {
          console.error('Failed to close the connection: ' + err.message);
        } else {
          console.log('Connection closed.');
        }
      });
}

getSnowflakeData();
