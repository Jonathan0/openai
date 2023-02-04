const fs = require('fs');

describe('openAI country places test', () => {

  it('visit the openAI local home page', () => {
    const country = ["France", "Spain", "United States", "Italy", "Turkiey", "Germany", "Mexico", "Indian",
        "United Kingdom", "China", "Greece", "Thailand", "Australia", "Canada", "Japan", "Portugal", "Netherlands",
        "Austria", "Russia", "Indonesia", "Morocco", "Malaysia", "South Korea", "Vietnam", "Singapore", "South Africa",
        "Egypt", "Qatar", "United Arab Emirates", "Costa Rica", "Colombia", "Norway", "Switzerland", "Dominican Republic",
        "Croatia", "The Bahamas", "New Zealand", "Ukraine", "Hungary", "Israel", "Brazil", "Chile", "Philippines"];
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