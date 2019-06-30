describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('starts game by clicking on start button', () => {
    cy.get('.board')
      .find('.tile')
      .as('buttons');

    cy.get('@buttons')
      .should($buttons => {
        expect($buttons).to.have.length(16);
      })
      .each($button => {
        expect($button.attr('class')).not.to.equal(
          'tile tile--isActive'
        );
        expect($button.text()).to.equal('');
      });

    cy.get('button')
      .contains(/start game/i)
      .should('exist')
      .click();

    cy.get('.tile--isActive')
      .its('length')
      .should('be.gt', 0);

    cy.get('.tile:not(.tile--isActive)')
      .first()
      .click();
  });
});
