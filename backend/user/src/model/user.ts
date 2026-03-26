import mongoose , {Document, Schema} from "mongoose";


export interface Iuser extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
}

const schema : Schema<Iuser> = new Schema<Iuser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    }
},{
    timestamps: true
}); 

export const User = mongoose.model<Iuser>("User", schema);

