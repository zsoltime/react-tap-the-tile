describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows splash screen on opening app', () => {
    cy.get('[class^="Modalstyle__Content"]')
      .find('h2')
      .contains(/tap the tile/i)
      .should('be.visible');

    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .should('be.visible');
  });

  it('starts game if I click on the start button', () => {
    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .click();

    cy.get('[class^="Board__StyledBoard"]')
      .find('[class^="Tile__StyledTile"]')
      .as('buttons');

    cy.get('@buttons').should($buttons => {
      expect($buttons).to.have.length(16);
    });

    cy.get('@buttons')
      .contains(/5/)
      .should('have.length', 1);
  });

  it('increases score and shows a new random tile if I click on an active tile', () => {
    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .click();

    cy.get('[class^="Board__StyledBoard"]')
      .find('[class^="Tile__StyledTile"]')
      .as('buttons');

    cy.get('@buttons')
      .contains(/5/)
      .should('have.length', 1)
      .click();

    cy.get('.score').should($div => {
      const text = $div.text();

      expect(text).to.match(/score: 5/i);
    });

    // TODO: couldn't it be 25 or 45 if it was a tile
    // with more than one clicks?
    cy.focused().should('have.text', '');

    cy.get('@buttons')
      .contains(/5/)
      .its('length')
      .should('be.gt', 0);
  });

  it('increases the score by the number of seconds left before the tile disappears', () => {
    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .click();

    cy.get('[class^="Board__StyledBoard"]')
      .find('[class^="Tile__StyledTile"]')
      .as('buttons');

    cy.wait(1000);

    cy.get('@buttons')
      .contains(/4/)
      .should('have.length', 1)
      .click();

    cy.get('.score').should($div => {
      const text = $div.text();

      expect(text).to.match(/score: 4/i);
    });
  });

  it("hides the active tile if I don't click on it for at least five seconds", () => {
    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .click();

    cy.get('[class^="Board__StyledBoard"]')
      .find('[class^="Tile__StyledTile"]')
      .as('buttons');

    cy.get('@buttons')
      .contains(/5/)
      .parent('button')
      .as('firstActiveTile');

    cy.get('@firstActiveTile').should('have.text', '5');

    cy.wait(5000);

    cy.get('@firstActiveTile').should('have.text', '');
  });

  it('ends game if I click on an inactive tile', () => {
    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .click();

    cy.get('[class^="Board__StyledBoard"]')
      .find('[class^="Tile__StyledTile"]')
      .as('buttons');

    cy.get('@buttons')
      .contains(/5/)
      .click();

    cy.get('@buttons').each($buttons => {
      for (let i = 0; i < $buttons.length; i++) {
        if (Cypress.$($buttons[i]).text() === '') {
          Cypress.$($buttons[i]).click();
          break;
        }
      }
    });

    cy.get('[class^="Modalstyle__Content"]')
      .find('h2')
      .contains(/game over/i)
      .should('be.visible');

    cy.get('[class^="Modalstyle__Content"]')
      .find('strong')
      .first()
      .should('have.text', 'Score: 5');

    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .should('be.visible');
  });

  it.skip('pauses game by clicking the pause button', () => {
    cy.get('[class^="Button__StyledButton"]')
      .contains(/new game/i)
      .click();

    cy.get('[class^="Board__StyledBoard"]')
      .find('[class^="Tile__StyledTile"]')
      .as('buttons');

    cy.get('@buttons')
      .contains(/5/)
      .should('have.length', 1);

    cy.get('[class^="Button__StyledButton"]')
      .contains(/pause/i)
      .click();
  });
});
