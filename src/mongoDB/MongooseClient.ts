import { Mongoose } from "mongoose";

export class MongoClient {
  private static instance: MongoClient;
  private mongoose: Mongoose;
  
  private constructor() {
    this.mongoose = new Mongoose();
  }
  
  public static getInstance(): MongoClient {
    if (!MongoClient.instance) {
      MongoClient.instance = new MongoClient();
    }
    
    return MongoClient.instance;
  }
  
  public getMongoose(): Mongoose {
    return this.mongoose;
  }
  
  public connect(url: string): void {
    this.mongoose.connect(url).then(() => {
      console.log("Connected to MongoDB");
    }).catch((error) => {
      console.log("Error connecting to MongoDB: ", error);
    });
  }
  
  public uploadScheme() {
    const UploadScheme = new this.mongoose.Schema({
      fileName: {
        type: String,
        required: true,
      },
      file: {
        buffer: Buffer,
        mimetype: String,
      },
      uploadTime: {
        type: Date,
        default: Date.now,
      },
    });
    
    return this.mongoose.model("Upload", UploadScheme);
  }
}