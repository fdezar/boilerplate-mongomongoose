const dotenv = require('dotenv');
dotenv.config({path: 'sample.env'});

const express = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true });

let Schema = mongoose.Schema;

let personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

let createAndSavePerson = done => {

  let firstPerson = new Person({
  name: "Person One",
  age: 22,
  favoriteFoods: ["Salad", "Chicken"]
  });

  firstPerson.save((error, data) => {
    if(error) {
      console.log(error);
      done(error);
    } else {
      done(null, data);
    }
  });
}

const secondPerson = done => {
  let newPerson = new Person({
    name: "Person Two",
    age: 23,
    favoriteFoods: ["Fish", "Potato"]
  });

  newPerson.save((error, data) => {
    if (error) {
      console.log(error);
      done(error);
    } else {
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
     done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, peopleFound) => {
    if(error) return console.log(error);
    done(null, peopleFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, peopleByFood) => {
    if (error) {
      return console.log(error);
    } else {
      done(null, peopleByFood);
    }
  });
}; 

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, individual) => {
    if (error) return console.log(error);
    done(null, individual);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
    if (error) return console.log(error);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  let query = { name: personName };
  let ageUpdate = { age: 20 };
  let booleanNew = { new: true };
  
  Person.findOneAndUpdate(query, ageUpdate, booleanNew, (error, foundPerson) => {
    if(error) return console.log(error);
    done(null, foundPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, personToRemove) => {
    if (error) return console.log(error);
    done(null, personToRemove);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(nameToRemove, (error, personRemoved) => {
    if (error) return console.log(error);
    done(null, personRemoved);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 'asc'} ).limit(2).select('-age').exec((error, searchResult) => {
    console.log(searchResult);
    done(error, searchResult);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
