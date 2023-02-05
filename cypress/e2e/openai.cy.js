const fs = require('fs');

describe('openAI country places test', () => {
  // preload test data from a fixture json file
  beforeEach(function () {
      cy.fixture('countries').then((countries) => {
        this.countries = countries
      })
    });

  it('visit the openAI local home page', function () {
    const country = this.countries.names;
    let dictionary = "";

    cy.on('uncaught:exception', (err, runnable) => { return false; });
    cy.visit('http://localhost:3000');
    for(let i=0; i<20; i++) {
        cy.wait(500);
        const name = country[Math.floor(Math.random() * country.length)];
        cy.get('input[name="country"]').clear().type(name);
        cy.get('#__next > div > main > form > input[type=text]:nth-child(1)').should('have.value', name);
        cy.get('#__next > div > main > form > input[type=submit]:nth-child(2)').click();
        cy.wait(1500);
        cy.get('#__next > div > main > div').should('be.visible');
        cy.get('#__next > div > main > div').then($value => {
            // save to file
            const places = $value.text();
            cy.writeFile('cypress/json/' + name + "Name.json", places, 'utf8');
        })
    }
  })

})