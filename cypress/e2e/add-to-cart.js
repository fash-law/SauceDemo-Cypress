import LoginPage from "../support/pageObjects/LoginPage";
/// <reference types="cypress" />

describe("Confirm Add to Cart", () => {
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
    it("Validate adding a product to cart", () => {
        cy.get("#item_4_title_link").click();
        cy.get("#add-to-cart").click();
        //verify item added to cart
        cy.get('[data-test="inventory-container"]').find('.inventory_details_name').should('contain', "Sauce Labs Backpack");
        //verify add to cart changes to remove button
        cy.get("#remove").should('be.visible');
    });
    after('log test is completed', () => {
        cy.log('Test is completed')
    })

})