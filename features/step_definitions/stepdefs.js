const { World } = require('./world');
const { Given, When, Then, setWorldConstructor } = require('@cucumber/cucumber');

setWorldConstructor(World);
