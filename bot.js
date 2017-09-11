const twit = require ('twit');
require('dotenv').config({ path: 'variables.env' });

const Twitter = new twit({
         consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
         access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const retweet = () => {
  let params = {
    q: 'ron howard voice',
    result_type: 'recent',
    lang: 'en'
    }

    Twitter.get('search/tweets', params, (err, data) => {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
          let retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          Twitter.post('statuses/retweet/:id', {
            id: retweetId
          }, (err, response) => {
            if (response)
              console.log('Retweeted.');
            // if there was an error while tweeting
            if (err)
              console.log('Something went wrong while tweeting.');
          });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong searching...');
        }
    });
}

retweet();

setInterval(retweet, 1800000);
