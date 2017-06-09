const twit = require ('twit');
const config = require('./config.js');

require('dotenv').config({ path: 'variables.env' });

const Twitter = new twit(config);

const retweet = function(){
  let params = {
    q: 'ron howard voice',
    result_type: 'recent',
    lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            let retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted.');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while tweeting.');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong searching...');
        }
    });
}

retweet();

setInterval(retweet, 3600000);
