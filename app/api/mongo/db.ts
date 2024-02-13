// mongo/mongodb.js
import { MongoClient, Db } from "mongodb";

interface Client {
  promise?: Promise<{ client: MongoClient; db: Db }>;
  conn?: any; 
}

interface MongoInstance {
  conn?: MongoClient;
  promise?: Promise<{ client: MongoClient; db: Db }>;
}

declare global {
  var mongo: MongoInstance;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: Client;

if (!process.env.ATLAS_URI) {
  throw new Error("Please define the ATLAS_URI environment variable");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to retain the MongoClient instance
  // across hot-reloads to avoid multiple MongoClient instances.
  if (!global.mongo) {
    global.mongo = { conn: undefined, promise: undefined };
  }
  client = global.mongo;
} else {
  // In production mode, use a module-scoped variable.
  client = {};
}

if (!client.promise) {
  client.promise = MongoClient.connect(uri, options).then((clientInstance) => {
    const db = clientInstance.db("whisperPods");
    return { client: clientInstance, db };
  });
}

const getClientAndDb = async () => {
  if (client.promise) {
    const { client: clientInstance, db } = await client.promise;
    return { client: clientInstance, db };
  } else {
    throw new Error("Client promise is not defined");
  }
};

export { getClientAndDb };
