const fs = require('fs');

describe('openAI country places test', () => {
  // preload test data from a fixture json file
  beforeEach(function () {
      cy.fixture('countries').then((countries) => {
        this.countries = countries
      })
      cy.fixture('questions').then((questions) => {
        this.questions = questions
      })
    });

//  it('openAI search country test', function () {
//    const country = this.countries.names;
//    let dictionary = "";
//
//    cy.on('uncaught:exception', (err, runnable) => { return false; });
//    cy.visit('http://localhost:3000');
//    for(let i=0; i<20; i++) {
//        cy.wait(500);
//        const name = country[Math.floor(Math.random() * country.length)];
//        cy.get('input[name="country"]').clear().type(name);
//        cy.get('#__next > div > main > form:nth-child(3) > input[type=text]:nth-child(1)').should('be.visible');
//        cy.get('#__next > div > main > form:nth-child(3) > input[type=submit]:nth-child(2)').click();
//        cy.wait(1500);
//        cy.get('#__next > div > main > div:nth-child(4)').should('be.visible');
//        cy.get('#__next > div > main > div:nth-child(4)').then($value => {
//            // save to file
//            const places = $value.text();
//            cy.writeFile('cypress/json/' + name + "Name.json", places, 'utf8');
//        })
//    }
//  })

  it('openAI find answers test', function () {
      const question = this.questions.lists;
      let dictionary = "";

      cy.on('uncaught:exception', (err, runnable) => { return false; });
      cy.visit('http://localhost:3000');
      for(let i=0; i<10; i++) {
          cy.wait(1000);
          const name = question[Math.floor(Math.random() * question.length)];
          cy.get('input[name="question"]').clear().type(name);
          cy.get('#__next > div > main > form:nth-child(7) > input[type=text]:nth-child(1)').should('be.visible');
          cy.get('#__next > div > main > form:nth-child(7) > input[type=submit]:nth-child(2)').click();
          cy.wait(5000);
          cy.get('#__next > div > main > div:nth-child(8)').should('be.visible');
          cy.get('#__next > div > main > div:nth-child(8)').then($value => {
              // save to file
              const ans = $value.text();
              cy.writeFile('cypress/json/' + name.slice(-10,-1) + "Answer.json", ans, 'utf8');
          })
      }
    })
})