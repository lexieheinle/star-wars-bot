# Star Wars Bot
Star Wars Bot is simple Messenger chat bot that uses [swapi's Star Wars API](https://swapi.co) to get the data about the Star Wars universe, built using the [Claudia Bot Builder](https://github.com/claudiajs/claudia-bot-builder), node.js library for creating chat bots for various platform and deploying them on AWS Lambda.  

Inspired by the [Space Explorer bot](https://github.com/stojanovic/space-explorer-bot).

## Contact the Republic's Central Knowledge System (Message the bot)

[![Messenger code](assets/images/profile.png)](http://m.me/starwarsuniversebot)

Or go to [m.me/starwarsuniversebot](http://m.me/starwarsuniversebot).

## How to run and deploy it

### Prerequests:

- Create a new bot page in Facebook and a messenger app, as explained in the Facebook Messenger Getting Started Guide.

### Steps:

1. Clone the repository and run:

   ```
   npm init
   ```

2. Install `claudia` as a global utility, if you do not have it already:

   ```
   npm install claudia -g
   ```

3. Create a new bot in AWS. If you changed the name of bot.js file, change the `--api-module` argument below accordingly.

   ```
   claudia create --region us-east-1 --api-module bot
   ```

4. Configure Facebook Bot with a following command and follow the instructions:

   ```
   claudia update --configure-fb-bot --configure-app
   ```

   - `--configure-fb-bot` will prompt you for FB page access token and FB app secret (for message validation) and it'll print out your webhook URL;  

Full instructions for Claudia Bot Builder are available in [Getting started with Claudia Bot Builder](https://github.com/claudiajs/claudia-bot-builder/blob/master/docs/GETTING_STARTED.md) guide.

# License

The MIT License (MIT)

Copyright (c) 2016 Lexie Heinle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
