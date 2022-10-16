const { World } = require('./world');
const { Given, When, Then, setWorldConstructor } = require('@cucumber/cucumber');
const axios = require('axios');
const should = require('chai').should();

setWorldConstructor(World);

Given(/^the base url of the '(\w*)' API is '(.*)'$/, function (apiName, baseUrl) {
  if(this.context[apiName] === undefined) {
    this.context[apiName] = {};
  }
  this.context[apiName]['baseUrl'] = baseUrl;
});

When(/^a GET request is sent to the '([\w/]*)' endpoint of the '(\w*)' API$/, async function (endpoint, apiName) {
  const config = {
      method: 'get',
      url: endpoint,
      baseURL: this.context[apiName]['baseUrl']
  };

  try {
      this.context.response = await axios(config);
  }
  catch(e) {
    if(e.response) {
      this.context.response = e.response;
    } else {
      e.code.should.not.equal('ECONNREFUSED', `request sent to '${config.baseURL}${config.url}' failed`);
      console.log(e);
    }
  }
});

Then(/^the response status code should be '(\d*)'$/, function (responseStatusCode) {
  should.exist(this.context.response, 'bla');
  this.context.response.status.should.equal(Number(responseStatusCode));
});

Then('the response body should be', function (responseBody) {
  this.context.response.data.should.equal(responseBody);
});
