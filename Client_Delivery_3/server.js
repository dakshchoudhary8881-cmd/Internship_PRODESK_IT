const app = require("./app");
const config = require("./config");

const startServer = () => {
  const { port, nodeEnv } = config;

  app.listen(port, () => {
    console.log(`\n=========================================`);
    console.log(`  ${config.api.name}`);
    console.log(`=========================================`);
    console.log(`  Environment : ${nodeEnv}`);
    console.log(`  Port        : ${port}`);
    console.log(`  URL         : http://localhost:${port}`);
    console.log(`  API Base    : http://localhost:${port}${config.api.prefix}/waitlist`);
    console.log(`=========================================\n`);
  });
};

startServer();
