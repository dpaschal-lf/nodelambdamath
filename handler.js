'use strict';

const mathHandlers = {
  'add': (n1, n2) => n1+n2,
  'sub': (n1, n2) => n1-n2,
  'mul': (n1, n2) => n1*n2,
  'div': (n1, n2) => n1/n2
}

module.exports.doMath = (event, context, callback) => {

  let response = {
    statusCode: 502,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: null
  };
  if(!event.hasOwnProperty('queryStringParameters')||
    event.queryStringParameters === null || 
    !event.queryStringParameters.hasOwnProperty('op')||
    !event.queryStringParameters.hasOwnProperty('num1')||
    !event.queryStringParameters.hasOwnProperty('num2')
  ){
    response.body = `required params: num1, num2, op, where op is add, sub, mul, div`;
    return callback(null, response);
  }
  const operation = event.queryStringParameters.op;
  if(!mathHandlers.hasOwnProperty(operation)){
    response.body = `op can only be from the following: add, sub, mul, div`;
    return callback(null, response);
  }

  response.body = mathHandlers[operation]( 
    parseFloat(event.queryStringParameters.num1), 
    parseFloat(event.queryStringParameters.num2)
  )
  response.statusCode = 200;

  callback(null, response);
};
