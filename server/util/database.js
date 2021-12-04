const mongoose = require("mongoose");

//db cloud

// const uri =
//   "mongodb+srv://dbUser:dbUser@cluster0.vz7qs.mongodb.net/MovieBooking?retryWrites=true&w=majority";
// module.exports = {
//   async getConnectDB() {
//     await mongoose
//       .connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => {
//         console.log("Connect to database successfully");
//       })
//       .catch(console.log);
//   },
// };

//db local
module.exports = {
  async getConnectDB() {
    try {
      await mongoose.connect("mongodb://localhost:27017/hanashop", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("connect successfully!");
    } catch (error) {
      console.log("failed");
    }
  },
};
