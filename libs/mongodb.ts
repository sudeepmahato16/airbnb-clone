import { MongoClient } from "mongodb";

if (!process.env.NEXT_PUBLIC_DATABASE_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri: string = process.env.NEXT_PUBLIC_DATABASE_URI;
const options = {
    
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
