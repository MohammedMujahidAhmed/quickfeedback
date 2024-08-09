import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean,
    isAcceptingMessage:boolean;
    // this is the typescript type safty bro in the next line, I am writing to remember this that's it
    messages: Message[];
}

const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"User name required"],
        trim: true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email name required"],
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"Verifiy code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verifiy code expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },
    messages:[MessageSchema],
})

// here we do two Things
// const someMode = (I already have a mode i want it form db) || (I am creating the mode for the first time)
// here (mongoose.models.user) ---> this was enough 
// (mongoose.Model<User>) in (mongoose.models.User as mongoose.Model<User>) is type script type safty
// (mongoose.model("User",UserSchema)) ---> javascript 
//(Type Script (mongoose.model<User>("User",UserSchema))
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel;