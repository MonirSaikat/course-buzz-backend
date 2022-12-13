const mongoose = require("mongoose");

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));
