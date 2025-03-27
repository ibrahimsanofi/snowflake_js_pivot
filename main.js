// Connecting to a Snowflake database using plain JavaScript can be done by leveraging the Snowflake REST API. Below is a simple example to get you started:

// Step 1: Set Up Your Environment

// Ensure you have the necessary credentials and details:

// Account URL
// Username
// Password
// Warehouse
// Database
// Schema

import { post } from "./node_modules/axios/lib/axios.js";

async function connectToSnowflake() {
  const account = 'EMEA_DATA';
  const username = 'TECH_DCF_PROD_MONITOR_BI';
  const password = 'fRTuxK!G*Bhc|HL)|w(fgt~OMaA+8]P^ASdXtw[1';
  const warehouse = 'tech_dcf_prod_wh_monitor_bi_proc';
  const database = 'TECH_DCF_PROD';
  const schema = 'DMT_MONITOR';

  const authData = {
    data: {
      ACCOUNT: account,
      USER: username,
      PASSWORD: password,
      WAREHOUSE: warehouse,
      DATABASE: database,
      SCHEMA: schema
    }
  };

  try {
    const response = await post(`https://${account}.snowflakecomputing.com/session/v1/login-request`, authData);
    const token = response.data.data.token;

    console.log('Successfully connected to Snowflake!');
    console.log('Token:', token);

    return token, account;

  } catch (error) {
    console.error('Error connecting to Snowflake:', error);
  }
}


// Once connected, you can execute queries using the token obtained:

async function executeQuery(query) {
    const connToken = connectToSnowflake()[0];
    const account = connectToSnowflake()[1];

  const queryData = {
    data: {
      SQLText: query
    }
  };

  try {
    const response = await axios.post(`https://${account}.snowflakecomputing.com/queries/v1/query-request`, queryData, {
      headers: {
        Authorization: `Bearer ${connToken}`
      }
    });

    console.log('Query Result:', response.data.data);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

// Example usage:
const strSQL = "SELECT DISTINCT project_name, environment, execution_date, status FROM tech_dcf_prod.dmt_monitor.ma_monitor_job_summary_status"
executeQuery(strSQL);
