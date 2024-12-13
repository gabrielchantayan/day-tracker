import type { Collection, Db, MongoClientOptions } from 'mongodb';
import { MongoClient } from 'mongodb';
import { log_db } from '../misc/logger';

const db_url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(db_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as MongoClientOptions);

const dbName = 'day_tracker';

client.connect();

const insert = async (collectionName: string, data: object) => {
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const insertResult = await collection.insertOne(data);

	log_db(`Inserted in to ${collectionName}`);

	return insertResult;
};

const find_all = async (collectionName: string) => {
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const findAllResult = await collection.find({}).toArray();

	log_db(`Found all items in ${collectionName}`);

	return findAllResult;
};

const find = async (collectionName: string, query: object) => {
	// Connect to the DB then to the collection
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const findAllResult = await collection.find(query).toArray();

	log_db(`Found all items in ${collectionName} with query ${JSON.stringify(query)}`);

	return findAllResult;
};

const find_one = async (collectionName: string, query: object) => {
	// Connect to the DB then to the collection
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const findOneResult = await collection.findOne(query);

	log_db(`Found one item in ${collectionName} with query ${JSON.stringify(query)}`);

	return findOneResult;
};

const update = async (collectionName: string, query: object, updatedValue: object) => {
	// Connect to the DB then to the collection
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const updateResult = await collection.updateOne(query, { $set: updatedValue });

	log_db(`Updated item in ${collectionName} with query ${JSON.stringify(query)}`);

	return updateResult;
};

const update_many = async (collectionName: string, query: object, updatedValue: object) => {
	// Connect to the DB then to the collection
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const updateResult = await collection.updateMany(query, { $set: updatedValue });

	log_db(`Updated items in ${collectionName} with query ${JSON.stringify(query)}`);

	return updateResult;
};

const check_if_exists = async (collectionName: string, query: object): Promise<number> => {
	// Connect to the DB then to the collection
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const countResult = await collection.countDocuments(query);

	log_db(`Checked if a result in ${collectionName} with query ${JSON.stringify(query)} exists`);
	log_db(countResult, 5);

	return countResult;
};

const create_collection = async (collectionName: string): Promise<void> => {
	// Connect to db
	const db: Db = client.db(dbName);

	// Create db
	await db.createCollection(collectionName);

	log_db(`Collection created: ${collectionName}`);
};

const delete_one = async (collectionName: string, query: object) => {
	// Connect to the DB then to the collection
	const db: Db = client.db(dbName);
	const collection: Collection = db.collection(collectionName);

	const deleteResult = await collection.deleteOne(query);

	log_db(`Deleted one item in ${collectionName} with query ${JSON.stringify(query)}`);

	return deleteResult;
};

export { check_if_exists, create_collection, delete_one, find, find_all, find_one, insert, update, update_many };
