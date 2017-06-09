const twit = require ('twit');
const config = require('./config.js');

const Twitter = new twit(config);

const retweet = function(){
  let params = {
    q: 'ron howard voice',
    result_type: 'recent',
    lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err, data){
      if (!err){
        let retweetId = data.statuses[0].id_str;

        Twitter.post('statuses/retweet/:id', {
          id: retweetId
        }, function(err, res){
          if (res){
            console.log('Retweeted!');
          }
          if (err){
            console.log('Something went wrong while tweeting.');
          }

        });
      }
      else {
        console.log('Something went wrong while searching.');
      }
    });
}

retweet();

setInterval(retweet, 600000);
