var axios = require('axios');

export async function textInput(input) {
    const requestOptions = {
        headers: {'Content-Type' : 'application/json'}
    }
    var results = await axios.post('http://172.16.75.138:3000/chat', {
        message: input
    }, requestOptions)
    var errorCatch = [];
    for(var i = 0; i < results.data.results.listWrongText.length; i++){
        errorCatch.push(results.data.results.listWrongText[i].Describe)
    };
    console.log(results, errorCatch);
    return [results, errorCatch];
}