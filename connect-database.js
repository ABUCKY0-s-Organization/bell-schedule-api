const { Client } = require("cassandra-driver");

async function run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "secure-connect-bell-schedule.zip",
    },
    credentials: {
      username: "LsTXPMAHYFnZutOBPnalFCDA",
      password: "1MkCHc4noYm7ADzR2KJKvnID3SiddJJoo,f6I,hj0ni34by6O4wYaAC,ga+6ulWqtWhNU,rLe91sPHCnD,MKd2.ojYC8OZi9F9gPf_KHizUMjBv37S.oTL3SuXA-Hi1H",
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM system.local");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();
}

// Run the async function
run();