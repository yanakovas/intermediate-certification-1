describe('Login and add deposit', () => {
  it('test', () => {
    cy.visit(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
    );
    cy.get('.btn-lg').contains('Customer Login').click();
    cy.get('select').select('Ron Weasly');
    cy.get('button').contains('Login').click();
    cy.get('button').contains('Login').click();
    cy.get('button[ng-class="btnClass2"]').click();
    cy.get('input[placeholder="amount"]').type(1001);
    cy.get('button[type="submit"]').click();
    cy.get('span').contains('Deposit Successful');
    cy.get('button').contains('Logout').click();
  });
});
