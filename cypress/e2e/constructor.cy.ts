describe('Stellar Burgers Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.viewport(1440, 1280);
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'mockIngredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'mockUser.json'
    }).as('getUser');
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.intercept('POST', 'api/orders', {
      fixture: 'mockOrder.json'
    }).as('getOrder');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Test Burger Constructor', () => {
    it('Add bun Test', () => {
      cy.contains('Краторная булка N-200i').parents('li').contains('Добавить').click();
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
    });

    it('Add main Test', () => {
      cy.contains('Биокотлета из марсианской Магнолии').parents('li').contains('Добавить').click();
      cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    it('Add sauce Test', () => {
      cy.contains('Соус Spicy-X').parents('li').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    });

    it('Make full Burger Test', () => {
      cy.contains('Краторная булка N-200i').parents('li').contains('Добавить').click();
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');

      cy.contains('Биокотлета из марсианской Магнолии').parents('li').contains('Добавить').click();
      cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии').should('exist');

      cy.contains('Соус Spicy-X').parents('li').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');
    })
  });

  describe('Test Modal Ingredient', () => {
    it('Open and Close modal Test', () => {
      cy.get('ul li').first().click();
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
      cy.get('#modals').find('[type=button]').click().should('not.exist');
    });
  });

  describe('Test Order', () => {
    it('Make full Order Test', () => {
      cy.get('header').contains('Алексей').should('exist');

      cy.contains('Краторная булка N-200i').parents('li').contains('Добавить').click();
      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');

      cy.contains('Биокотлета из марсианской Магнолии').parents('li').contains('Добавить').click();
      cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии').should('exist');

      cy.contains('Соус Spicy-X').parents('li').contains('Добавить').click();
      cy.get('.constructor-element').contains('Соус Spicy-X').should('exist');

      cy.get('section').last().find('[type=button]').click();
      cy.get('#modals').contains('58792').should('exist');
      cy.get('#modals').find('[type=button]').click().should('not.exist');
      cy.get('#root').should('contain', 'Выберите булки').and('contain', 'Выберите начинку');
    })
  })
})