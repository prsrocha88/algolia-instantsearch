const express = require('express')
const path = require('path')
var cors = require('cors')

const app = express()
app.use(cors())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");

app.get('/', function (req, res) {
  res.render('demo', {

    title: 'View Engine Demo'
  })
});

app.post('/search', async ({ body }, res) => {
  try {
    const { requests } = body;
    const results = await algoliaClient.search(requests);
    res.status(200).send(results);
  } catch(e) {
    console.log(e)
  }
  
});

const port = 3000; 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});