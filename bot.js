/*jshint esversion: 6 */

'use strict';

const rp = require('minimal-request-promise');
const botBuilder = require('claudia-bot-builder');
const fbTemplate = botBuilder.fbTemplate;

function mainMenu() {
  return new fbTemplate.generic()
    .addBubble(`Available retrieval groups`, `Choose a group below to retrieve information.`)
      .addImage('https://raw.githubusercontent.com/lexieheinle/star-wars-bot/master/assets/images/background_species.png')
      .addButton('Person', 'SHOW_PERSON')
      .addButton('Planet', 'SHOW_PLANET')
      .addButton('Species', 'SHOW_SPECIES')
    .addBubble('Transportation options', 'View information about various forms of transportation')
      .addImage('https://raw.githubusercontent.com/lexieheinle/star-wars-bot/master/assets/images/background_vehicles.png')
      .addButton('Vehicle', 'SHOW_VEHICLES')
      .addButton('Starships', 'SHOW_STARSHIPS')
      .addButton('Report an issue', 'https://github.com/lexieheinle/star-wars-bot/issues')
    .addBubble('More information', 'Learn about the data, code and the jedi behind this bot.')
        .addImage('https://raw.githubusercontent.com/lexieheinle/star-wars-bot/master/assets/images/background_extras.png')
        .addButton('Data source', 'ABOUT_DATA')
        .addButton('Read the code', 'https://github.com/lexieheinle/star-wars-bot/')
        .addButton('Meet the jedi', 'SHOW_JEDI')
    .get();
}

const api = botBuilder((request, originalApiRequest) => {
  console.log(JSON.stringify(request));
  originalApiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false;
  function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  const personNumber = getRandomIntInclusive(1,87);
  const planetNumber = getRandomIntInclusive(1, 61);
  const speciesNumber = getRandomIntInclusive(1,37);
  const vehicleNumber = getRandomIntInclusive(1, 39);
  const starshipsNumber = getRandomIntInclusive(1, 37);
  if (!request.postback)
    return rp.get(`https://graph.facebook.com/v2.6/${request.sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${originalApiRequest.env.facebookAccessToken}`)
      .then(response => {
        const user = JSON.parse(response.body);
        return [
          `Hello Rebel Fighter ${user.first_name}. Welcome to the Republic's Central Knowledge System! Ready to dive into the database`,
          'What information would you like today?',
          mainMenu()
        ];
      });
  if (request.text === 'SHOW_PERSON')
    return rp.get(`http://swapi.co/api/people/${personNumber}/`)
      .then(response => {
        const person = JSON.parse(response.body);
        return [
          `${person.name} ID: ${personNumber}`,
          `Height: ${person.height} Weight: ${person.mass}`,
          `Hair color: ${person.hair_color} Eye color: ${person.eye_color}`,
          new fbTemplate.button('Next actions:')
            .addButton('More information', 'http://swapi.co/api/people/${personNumber}/')
            .addButton('Back to start', 'MAIN_MENU')
            .get()
        ];
      });

  if (request.text === 'SHOW_PLANET')
      return rp.get(`http://swapi.co/api/planets/${planetNumber}/`)
        .then(response => {
          const planet = JSON.parse(response.body);
          return [
            `${planet.name} ID: ${planetNumber}`,
            `Climate: ${planet.climate} Terrain: ${planet.terrain}`,
            `Population: ${planet.population} Diameter: ${planet.diameter}`,
            new fbTemplate.button('Next actions:')
              .addButton('More information', 'http://swapi.co/api/planets/${planetNumber}/')
              .addButton('Back to start', 'MAIN_MENU')
              .get()
          ];
      });//planet to much
    if (request.text === 'SHOW_SPECIES')
        return rp.get(`http://swapi.co/api/species/${speciesNumber}/`)
          .then(response => {
            const species = JSON.parse(response.body);
            return [
              `${species.name} ID: ${speciesNumber}`,
              `Classification: ${species.classification} Designation: ${species.designation}`,
              `Average lifespan: ${species.average_lifespan} Average height: ${species.average_height}`,
              new fbTemplate.button('Next actions:')
                .addButton('More information', 'http://swapi.co/api/species/${speciesNumber}/')
                .addButton('Back to start', 'MAIN_MENU')
                .get()
            ];
        });
      if (request.text === 'SHOW_VEHICLES')
            return rp.get(`http://swapi.co/api/vehicles/${vehicleNumber}/`)
              .then(response => {
                const vehicle = JSON.parse(response.body);
                return [
                  `${vehicle.name} ID: ${vehicleNumber}`,
                  `Model: ${vehicle.model} Manufacturer: ${vehicle.manufacturer}`,
                  `Cost in Credits: ${vehicle.cost_in_credits} Crew-Passengers: ${vehicle.crew}-${vehicle.passengers}`,
                  new fbTemplate.button('Next actions:')
                    .addButton('More information', 'http://swapi.co/api/vehicles/${vehicleNumber}/')
                    .addButton('Back to start', 'MAIN_MENU')
                    .get()
                ];
            });
    if (request.text === 'SHOW_STARSHIPS')
          return rp.get(`http://swapi.co/api/starships/${starshipsNumber}/`)
            .then(response => {
              const starship = JSON.parse(response.body);
              return [
                `${starship.name} ID: ${starshipsNumber} Class: ${starship.starship_classtt}`,
                `Model: ${starship.model} Manufacturer: ${starship.manufacturer}`,
                `Cost in Credits: ${starship.cost_in_credits} Crew-Passengers: ${starship.crew}-${starship.passengers}`,
                new fbTemplate.button('Next actions:')
                  .addButton('More information', 'http://swapi.co/api/starships/${starshipsNumber}/')
                  .addButton('Back to start', 'MAIN_MENU')
                  .get()
              ];
          });

  if (request.text === 'MAIN_MENU')
    return mainMenu();

  if (request.text === 'ABOUT_DATA')
    return [
      `Star Wars information is provided by swapi, world's first quantified and programmatically-formatted set of Star Wars data.`,
      new fbTemplate.button('More actions:')
        .addButton('Visit website', 'https://swapi.co/about')
        .addButton('Back to start', 'MAIN_MENU')
        .get()
    ];

  if (request.text === 'SHOW_JEDI')
    return [
      `Lexie Heinle has been a fan of the Star Wars universe ever since her family's first lightsaber fight.`,
      `When she's not saving the Republic via super fast info retrieval, Lexie can be found developing for a newsroom in New York.`,
      new fbTemplate.button('Connect with Lexie:')
        .addButton('GitHub', 'https://github.com/lexieheinle')
        .addButton('Twitter', 'https://twitter.com/lexieheinle')
        .addButton('Back to start', 'MAIN_MENU')
        .get()
    ];

  if (request.text === 'CREDITS')
    return [
      'This bot was heavily influenced by the Space Explorer Bot and built on the Claudia Bot Builder platform',
      'Icons used for the bot are from the Noun Project',
      '- R2-D2 by icon 54, \n- Satellite icon by parkjisun, \n- Curiosity Rover icon by Oliviu Stoian, \n- Monster icon by Paulo Sá Ferreira',
      'This bot was created by Claudia Bot Builder team',
      new fbTemplate.button('More actions:')
        .addButton('Space Explorer Bot', 'https://github.com/stojanovic/space-explorer-bot')
        .addButton('Claudia Bot Builder', 'https://github.com/claudiajs/claudia-bot-builder')
        .addButton('The Noun Project', 'https://thenounproject.com')
        .get()
    ];
});

/*api.addPostDeployConfig('nasaApiKey', 'NASA API Key:', 'configure-app');*/

module.exports = api;
