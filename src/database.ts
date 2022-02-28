import mongoose from "mongoose";
import config from 'config';


mongoose.connect(config.get<string>('mongo-uri')).then(() =>{
    console.log("database connected");
}).catch(err => {
    console.log(err);
    process.exit(1);
});
