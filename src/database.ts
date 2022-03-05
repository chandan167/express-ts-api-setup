import mongoose from "mongoose";
import config from 'config';

const uri = config.get<string>("mongo.uri");
const database = config.get<string>("mongo.database");
mongoose.connect(`${uri}/${database}`).catch(err => {
    console.log(err);
    process.exit(1);
});
