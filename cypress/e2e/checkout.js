import LoginPage from "../support/pageObjects/LoginPage";
/// <reference types="cypress" />

describe("Validate Cart Overview", () => {
    beforeEach(() => {

        const loginpage = new LoginPage()

        loginpage.visit();
        loginpage.enterEmail('standard_user');
        loginpage.enterPassword('secret_sauce');
        loginpage.submit();

        // cy.visit("https://www.saucedemo.com/");
        // cy.get("#user-name").type('standard_user');
        // cy.get("#password").type('secret_sauce');
        // cy.get("#login-button").click();

    });
    it("Verify adding products to cart", () => {
        //navigate to cart page
        cy.get(".product_sort_container").select("Price (low to high)");
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click();
        cy.get('#add-to-cart-sauce-labs-onesie').click();
        cy.get('#shopping_cart_container').click();
        cy.get('#checkout').click();
        //error handling 
        cy.wait(4000)
        cy.get('#first-name').type('john');
        cy.get('#last-name').type('terry');
        cy.get('#postal-code').type(12345);
        cy.get('#continue').click();
        //verify overview page
        cy.url().should('contain', "/checkout-step-two.html");
        cy.get('[data-test="secondary-header"]').should('have.text', "Checkout: Overview")
        cy.url().should('contain', "/checkout-step-two.html");
        //verify price total
        cy.get('.summary_subtotal_label').contains(113.95)
        cy.get('#finish').click();
        //verify confirmation message 
        cy.get('.checkout_complete_container').find('.complete-header').should('have.text', "Thank you for your order!")


    })
    after('log test is completed', () => {
        cy.log('Test is completed')
    })

})