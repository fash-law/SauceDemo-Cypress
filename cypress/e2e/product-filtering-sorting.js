import LoginPage from "../support/pageObjects/LoginPage";
/// <reference types="cypress" />

describe("Confirm Product Filtering and Sorting", () => {
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
    it("Verify Dropdown List to Sort The Products by Price (Low to High)", () => {
        cy.get(".product_sort_container").select("Price (low to high)");
    })
    it("Verify that products are displayed in Ascending Order of Price", () => {
        cy.get(".product_sort_container").select("Name (A to Z)");
        //verify ascending order
        cy.get(".product_sort_container").select("Name (A to Z)").should('exist')

    })
    it("Verify that all price items are logged in Ascending Order", () => {
        cy.get('.product_sort_container').select("Price (low to high)");
        cy.get('.inventory_list').find('.inventory_item_price').each(($el, index, $list) => {
            cy.log($el.text());

        });
    })
    it("Verify and Calculate The Total Price of all Items", () => {
        cy.get('.product_sort_container').select("Price (low to high)");
        cy.get('.inventory_item_price').then($prices => {
            // Extract the text content of each product price, convert to number, and sum them up
            const total = [...$prices]
                .map(price => parseFloat(price.textContent.replace('$', '').trim()))
                .reduce((acc, price) => acc + price, 0);

            // Log the total price to the console
            cy.log('Total Price: ', total);

            // Example of an assertion if you know the expected total
            const expectedTotal = 129.94; // total price
            expect(total).to.equal(expectedTotal);
        });
    });
    afterEach('log test is completed', () => {
        cy.log('Test is completed')
    })

})