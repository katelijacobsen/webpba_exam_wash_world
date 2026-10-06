describe("Signup", () => {
  beforeEach(() => {
    // Visit the auth page before each test
    cy.visit("/");
    // Wait for React to finish hydrating before interacting
    // Without this, clicks fire before event listeners are attached
    cy.get('#signup').should('be.visible');
    // Wait until the button is fully interactive before continuing (React hydration)
    cy.wait(300);
  });

  it("should show the signup form when Sign up is clicked", () => {
    cy.get('#signup').should('be.visible').click()
    cy.get("#signupform").should("be.visible")
  });

  it("should show validation hints when a field is focused", () => {

    cy.get('#signup').should('be.visible').click()
    cy.get("#signupform").should("be.visible")
    cy.get('input[name="user_password"]').should('be.visible').click()
    cy.contains("span", "Skal være mellem 8 og 50 tegn").should('be.visible')
  });

  it("should show an error when password is too short", () => {
    cy.get('#signup').should('be.visible').click()
    cy.get("#signupform").should("be.visible")
    cy.get('input[name="user_password"]').should('be.visible').click()
    cy.get('input[name="user_password"]').type("pa")
    
    // have.class is the most idiomatic Cypress way —
    // it checks that the element has that class in its class list, regardless
    // of what other classes are on it.
    cy.get('input[name="user_password"]').should('have.class', 'error')
  });

  it("should successfully sign up with valid data", () => {
    cy.get('#signup').should('be.visible').click()
    cy.get("#signupform").should("be.visible")

    cy.get('input[name="user_fullname"]').should('be.visible').click()
    cy.get('input[name="user_fullname"]').type("wa")

    cy.get('input[name="user_address"]').should('be.visible').click()
    cy.get('input[name="user_address"]').type("this is an address")

    cy.get('input[name="user_phonenumber"]').should('be.visible').click()
    cy.get('input[name="user_phonenumber"]').type("12345678")

    // Hvis der skal laves en ny test så skal emailen ændres xD ellers kan der ikke oprettes en ny bruger
    // og success beskeden tilsidst kommer selvfølgelig ikke op.
    cy.get('input[name="email"]').should('be.visible').click()
    cy.get('input[name="email"]').type("ta@pa.dk")

    cy.get('input[name="user_password"]').should('be.visible').click()
    cy.get('input[name="user_password"]').type("password")

    cy.get('input[name="acceptPolicy"]').should('be.visible').click()

    cy.get('button[id="signingup"]').should("be.visible").click()
    cy.wait(2000);
    cy.contains('p', 'Please check your email').should('be.visible')
  });
});
