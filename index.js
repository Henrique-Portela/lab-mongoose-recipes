const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const newRecipe = new Recipe({
  title: 'Pipoca de Microondas',
  level: 'Easy Peasy',
  ingredients: [
    '1 Microondas',
    '1 Saco de Pipoca',
    'Sal a gosto',
    'Pimenta do reino a gosto',
    'Pimenta vermelha a gosto',
  ],
  cuisine: 'Brasileira',
  dishType: 'main_course',
  image: 'https://img.cybercook.com.br/receitas/147/pipoca-2-840x480.jpeg?q=75',
  duration: 10,
  creator: 'Henrique Portela',

})

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
    .then(() => {
      return Recipe.create(newRecipe)
  }) .then((result) => {  
    console.log(newRecipe)
  }) .then(() => {
      return Recipe.insertMany(data)
  }) .then(() => {
      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  }) .then(() => {
      console.log('Atualizado com SUCESSO!')
  }) .then(() => {
      return Recipe.deleteOne({title: "Carrot Cake"})
  }) .then(()=>{
    console.log('Deletado com SUCESSO!')
  }) 
  .catch(error => {
    console.error('Error connecting to the database', error);
  }) .finally(()=>{
     mongoose.connection.close()
  })

