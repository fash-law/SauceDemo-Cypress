import LoginPage from "../support/pageObjects/LoginPage";
/// <reference types="cypress" />

describe("Confirm Product listings", () => {
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

    })
    it('Verify Items Should Have a Name, Price, and "Add to Cart" Button For Each Product', () => {

        // Assuming each product is within an element with class 'inventory list'
        cy.get('.inventory_list').each(($inventory_list) => {
            // Check for product name
            cy.wrap($inventory_list).find('.inventory_item_label').should('exist');

            // Check for product price
            cy.wrap($inventory_list).find('.inventory_item_price').should('exist');

            // Check for "Add to Cart" button
            cy.wrap($inventory_list).find('.btn_inventory').should('exist');

        });

    });

    it('Verify Items Should be Sorted Alphabetically by Default', () => {
        // Assuming each product name is within an element with class 'inventory_list'
        cy.get('.inventory_list').then($products => {
            // Extract the text content of each product name into an array
            const productNames = [...$products].map(product => product.textContent.trim());

            // Create a sorted copy of the product names array
            const sortedProductNames = [...productNames].sort();

            // Assert that the product names are sorted by comparing to the sorted copy
            expect(productNames).to.deep.equal(sortedProductNames);
        });
    });
    afterEach('log test is completed', () => {
        cy.log('Test is completed')
    })

})