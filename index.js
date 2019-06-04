const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-622716498160-624536974679-6ZqJ9w6s3OSyXWjHtLd9r4Qk',
  name: 'HackerSalt'
});

//Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':wave:'
  };
  bot.postMessageToChannel('general', 'Get ready for some salt!', params);
});

//Error Handler
bot.on('error', err => {
  console.log(err);
});

//Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }
  handleMessage(data.text);
});

//Respond to Data
function handleMessage(message) {
  const hacker = message;
  findSalt(hacker);
}

//Tell
function findSalt(hacker) {
  axios
    .get(`https://hacker-salt.herokuapp.com/api/hacker/${hacker}`)
    .then(res => {
      const comment = res.data.top_cmnts_s.c_0.cleaned_comment;

      const params = {
        icon_emoji: ':speaking_head_in_silhoute:'
      };
      bot.postMessageToChannel('general', `${hacker}'s saltiest comment: "${comment}" Check out ${hacker}'s saltiness at https://www.hackersalt.com/${hacker}`, params);
    })
    .catch(err => {
      cancel();
    });
}
