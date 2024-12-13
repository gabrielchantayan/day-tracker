import * as mongo from './mongo';

const insert = mongo.insert;
const find_all = mongo.find_all;
const find = mongo.find;
const find_one = mongo.find_one;
const update = mongo.update;
const update_many = mongo.update_many;
const check_if_exists = mongo.check_if_exists;
const create_collection = mongo.create_collection;
const delete_one = mongo.delete_one;

const collections = [
    'otp', 
    'users',
    'days',
];


export {
    insert,
    find_all,
    find,
    find_one,
    update,
    update_many,
    check_if_exists,
    create_collection,
    collections,
    delete_one
}