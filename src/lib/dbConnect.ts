import mongoose from "mongoose";

//and isConnected?:number here ? is it can be empty or number
type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("already connected to mongodb")
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URL || '',{})
        connection.isConnected = db.connections[0].readyState
        console.log('Db connected Successfully')
    }catch(error){
        console.log('Db connection failed',error)
        process.exit(1)
    }
}

export default dbConnect;