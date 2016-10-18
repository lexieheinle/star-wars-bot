'use strict';

const botBuilder = require('claudia-bot-builder');
const fbTemplate = botBuilder.fbTemplate;

module.exports = botBuilder(request => `Hello from space explorer bot! Your request was: ${request.text}, ${request}`
  const generic = new fbTemplate.generic();

      return generic
        .addBubble('Claudia.js', 'Deploy Node.js microservices to AWS easily')
          .addUrl('https://claudiajs.com')
          .addImage('https://claudiajs.com/assets/claudiajs.png')
          .addButton('Say hello', 'HELLO')
          .addButton('Go to Github', 'https://github.com/claudiajs/claudia')
        .addBubble('Claudia Bot Builder')
          .addImage('https://claudiajs.com/assets/claudia-bot-builder-video.jpg')
          .addButton('Go to Github', 'https://github.com/claudiajs/claudia-bot-builder')
        generic.get(););
