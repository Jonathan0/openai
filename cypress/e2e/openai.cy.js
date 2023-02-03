describe('openAI animal name test', () => {

  it('visit the openAI local home page', () => {
    const animal = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];
    cy.on('uncaught:exception', (err, runnable) => { return false; });
    cy.visit('http://localhost:3000');
    for(let i=0; i<20; i++) {
        cy.wait(1000);
        const name = animal[Math.floor(Math.random() * 12)];
        cy.get('input[name="animal"]').clear().type(name);
        cy.get('#__next > div > main > form > input[type=text]:nth-child(1)').should('have.value', name);
        cy.get('#__next > div > main > form > input[type=submit]:nth-child(2)').click();
        cy.wait(1000);
        cy.get('#__next > div > main > div').should('be.visible');
    }
  })
})