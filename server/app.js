// Include Packages
var ProWritingAidApi = require('pro_writing_aid_api');
var express = require('express')
var bodyParser = require('body-parser')
var api = new ProWritingAidApi.TextApi();
require('dotenv').config();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
api.apiClient.basePath = "https://api.prowritingaid.com";
api.apiClient.defaultHeaders = { 'licenseCode': '8594E31B-78A3-4DCC-9693-DB299A2B323E' }

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Force https in production
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

app.listen(3000, function () {
    console.log('listening on port ' + 3000);
});

app.post('/chat', function (req, res) {
    if (req.body.message) {
        var text = req.body.message.toString();
        textAnalysis(text).then(function (results) {
            res.json(results)
        })
    } else {
        speechToText('/Users/hhduong/Desktop/Test2.wav').then(function(results){
            res.json(results)
        })
    }

})

var listWrongText = []
async function textAnalysis(text) {
    var request = new ProWritingAidApi.TextAnalysisRequest(
        text,
        ['grammar'],
        "General",
        "En"
    );
    var data = await api.post(request)
    var results = {}
    var count = 0
    for (var i = 0; i < data.Result.Tags.length; i++) {
        startPos = data.Result.Tags[i].startPos;
        endPos = data.Result.Tags[i].endPos;
        suggestionText = data.Result.Tags[i].suggestions[0];
        text = text.replace(text.substring(startPos + count, endPos + 1 + count), suggestionText)
        count += suggestionText.length - data.Result.Tags[i].subcategory.length

        var obj = {}
        obj.WrongText = data.Result.Tags[i].subcategory
        obj.Describe = data.Result.Tags[i].hint
        obj.RecommendText = data.Result.Tags[i].suggestions[0]
        listWrongText.push(obj)
    }
    results.afterChange = text
    results.listWrongText = listWrongText
    listWrongText = []
    if (data.Result.Tags.length != 0) {
        textAnalysis(text)
    }
    return { results }
}

async function speechToText(dir=''){
    var SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
        var fs = require('fs');

        var speechToText = new SpeechToTextV1({
            iam_apikey: '0zeYquAaOsKLoBu4bytQcVvVnK9r8RA3cW7cneYx1Kpr',
            url: 'https://stream.watsonplatform.net/speech-to-text/api/'
        });

        var params = {
            // From file
            audio: fs.createReadStream(dir),
            content_type: 'audio/l16; rate=48000'
        };

        var result = await speechToText.recognize(params)
        return result
}