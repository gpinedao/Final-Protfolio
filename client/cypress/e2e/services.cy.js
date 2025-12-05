/* global cy */

describe('Services Page', () => {
  it('sets token and loads services', () => {
    // Simulate login by setting token directly
    cy.visit('http://localhost:8080');

    cy.window().then((win) => {
      win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTgwNTJmZTc4ZjczY2RjZTU0Y2M1YiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDkxNDI1NCwiZXhwIjoxNzY0OTE3ODU0fQ.a6Z9KtqhTp5cyVPV6yaFOEWpjF-iwBoeeaHBJR3dfkE');
      win.localStorage.setItem('user', JSON.stringify({ email: 'admin@example.com' }));
    });

    // Now visit the services page
    cy.visit('http://localhost:8080/services');

    // Assertions
    cy.contains(/my services/i).should('exist');
    cy.get('[data-testid="service-card"]').should('have.length.at.least', 1);
  });
});
