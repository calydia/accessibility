describe('Registered user', () => {

  it('should fail with wrong credentials', () => {
    cy.visit('/user/login');
    cy.get('input[name=name]').should("be.visible");
    cy.get('input[name=name]').type('wrong-username');
    cy.get('input[name=pass]').type('wrong-password').type('{enter}');
    cy.contains('Unrecognized username or password');
  });

  it('should login with correct credentials', () => {
    cy.visit('/user/login');
    cy.get('input[name=name]').should("be.visible");
    cy.get('input[name=name]').type(Cypress.env('DRUPAL_USERNAME'));
    cy.get('input[name=pass]').type(Cypress.env('DRUPAL_PASSWORD')).type('{enter}');
    cy.contains('Member for');
  });

});
