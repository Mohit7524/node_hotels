/*

const mongoose = require('mongoose');

// Define the Person Schema

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    age:{
        type : Number
    },
    work:{
        type : String,
        enum : ['chef','waiter','manager'],
        required : true
    },
    mobile:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String
    },
    salary :{
        type : Number,
        required : true

    }


});

// Create a model of Person 

const Person = mongoose.model('Person',personSchema);
module.exports = Person;

*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }


});

personSchema.pre('save' , async function(next){
    const person = this;

    // Hash the password only if it has been modify (or is new)
    if(!person.isModified('password')) return next();

    try{

        // hash paasword generation

        const salt = await bcrypt.genSalt(10);

        // hash password 
        const hashedpassword = await bcrypt.hashedpassword(person.password,salt);

        person.password = hashedspassword;
        next();

    } catch(err){
        return next(err);

    }
})

// Create a model of Person
const Person = mongoose.model('Person', personSchema);

module.exports = Person;