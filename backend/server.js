const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

//import DB model & app configs
const app = express();
const Item = require("./src/models/items");
require('dotenv').config()
require("./src/db/connection");

// port
const port = process.env.PORT || 8000;

// require middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// API routes 

app.get("/", (req, res) => {
    res.send("Hello user. You get nothing in this route")
})

app.post("/v2/getInfo", (req, res) => {

    console.log("received data " + req.body.data);
    const app_id = process.env.OXFORD_APP_ID; // insert your APP Id
    const app_key = process.env.OXFORD_API_KEY; // insert your APP Key
    const word = req.body.data;
    const lang = "en-us";
    const fields = "pronunciations";
    const strictMatch = "false";

    let oxford = require("oxford-dictionaries-api");
    let oxforddictionaries = new oxford(app_id, app_key);

    oxforddictionaries.entries({ word_id: word, source_lang: lang })
        .then((data) => {
            console.log(data.id)
            console.log(data.results[0].lexicalEntries[0].lexicalCategory.text)
            console.log(data.results[0].lexicalEntries[0].entries[0].etymologies[0])
            // res.send(data);
            const wordList = {
                word: data.id,
                lexicalCategory: data.results[0].lexicalEntries[0].lexicalCategory.text,
                etymologies: data.results[0].lexicalEntries[0].entries[0].etymologies[0],
                definitions: data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0],
                list: data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text,
                subsenseDef: data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0],
                listtwo: data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0],
                definitionData: data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions[0],
                listthree: data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0],
            }
            const list = new Item(wordList);
            list.save().then(() => {
                res.status(200).send("Successfully Saved Data to MongoDB Server")
            }).catch((err) => {
                console.log(err);
                res.status(400).send(err);
            })

        })
        .catch((e) => console.log('Error', e));



    // const strictMatch = "false";

    // const options = {
    //     host: 'od-api.oxforddictionaries.com',
    //     port: '443',
    //     path: '/api/v2/entries/en-us/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
    //     method: "GET",
    //     headers: {
    //         'app_id': app_id,
    //         'app_key': app_key
    //     }
    // };

    // http.get(options, (resp) => {
    //     let body = '';
    //     resp.on('data', (d) => {
    //         console.log(d.toString('utf8'));
    //         body += d;
    //     });
    //     resp.on('end', () => {
    //         res.status(200).send(body);

})

app.get("/v2/wordList", (req, res) => {
    Item.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})


// using express server to host our app locally
app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
});