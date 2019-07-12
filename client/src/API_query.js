var axios = require('axios');

export async function textInput(input) {
    const requestOptions = {
        headers: {'Content-Type' : 'application/json'}
    }
    axios.post('http://172.16.75.138:3000/chat', {
        message: input
    }, requestOptions)
    .then(function (response) {
        console.log(response);
      })
    .catch(function (error) {
        console.log(error);
      });
}