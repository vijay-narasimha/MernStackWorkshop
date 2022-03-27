const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = "mongodb+srv://vijay:<PASSWORD>@cluster0.4ljk9.mongodb.net/natours?retryWrites=true&w=majority".replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfully');
  })

const app = require('./app');


const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);

   console.log('unhandler rejection');
  server.close(() => {
    process.exit(1);
  });
})

 process.on('uncaughtException', (err) => {
  console.log("uncaught exceptions")
  console.log(err.name, err.message);
 
  server.close(() => {
    process.exit(1);
  });
 });


 