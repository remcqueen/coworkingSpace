module.exports = function () {
  process.on('uncaughtException', (ex) => {
    console.log('Uncaught exception caught');
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    console.log('Unhandled rejection caught');
    process.exit(1);
  });
};
