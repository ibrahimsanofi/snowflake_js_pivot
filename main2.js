import { createConnection } from "./node_modules/snowflake-sdk/lib/snowflake.js";

const connection = createConnection({
  account:'EMEA_DATA',
  username:'TECH_DCF_PROD_MONITOR_BI',
  password:'fRTuxK!G*Bhc|HL)|w(fgt~OMaA+8]P^ASdXtw[1',
  warehouse:'tech_dcf_prod_wh_monitor_bi_proc',
  database:'TECH_DCF_PROD',
  schema:'DMT_MONITOR'
});

connection.connect((err) => {
  if (err) {
    console.log('Unable to connect', err.message);
  }
  else {
    console.log("Succession to Snowflake ok");
   // Execute a query
   connection.execute({
    sqlText: 'SELECT DISTINCT project_name, environment, execution_date, status FROM tech_dcf_prod.dmt_monitor.ma_monitor_job_summary_status LIMIT 10',
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Failed to execute statement due to the following error: ' + err.message);
      } else {
        console.log('Successfully executed statement: ' + stmt.getSqlText());
        console.log('Results:', rows);
      }
      
      // Close the connection
      connection.destroy((err) => {
        if (err) {
          console.error('Error disconnecting: ' + err.message);
        } else {
          console.log('Disconnected successfully.');
        }
      });
    }
  });
}
})