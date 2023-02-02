describe('openAI animal name test', () => {

  it('visit the openAI local home page', () => {
    cy.on('uncaught:exception', (err, runnable) => { return false; });
    cy.visit('http://localhost:3000');
    cy.get('input[name="animal"]').type('dog');
    cy.get('#__next > div > main > form > input[type=text]:nth-child(1)').should('have.value', 'dog');
    cy.get('#__next > div > main > form > input[type=submit]:nth-child(2)').click();
    cy.wait(1000);
    cy.get('#__next > div > main > div').should('be.visible');
  })
})