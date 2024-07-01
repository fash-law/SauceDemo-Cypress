import LoginPage from "../support/pageObjects/LoginPage";
/// <reference types="cypress" />

describe("Validate Cart Overview", () => {
    beforeEach(() => {

        const loginpage = new LoginPage()
        cy.log('Visiting cart page')

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
        cy.get(".product_sort_container").select("Price (low to high)");
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click();
        cy.get('#add-to-cart-sauce-labs-onesie').click();
        cy.get('#shopping_cart_container').click();
        cy.wait(4000)
        //verify & navigate to cart page
        cy.url().should('include', "/cart.html")
        cy.get('#cart_contents_container').find('.inventory_item_name').should('exist')
        //price and total
        cy.get('.inventory_item_price').then($prices => {
            // Extract the text content of each product price, convert to number, and sum them up
            const total = [...$prices]
                .map(price => parseFloat(price.textContent.replace('$', '').trim()))
                .reduce((acc, price) => acc + price, 0);

            // Log the total price to the console
            cy.log('Total Price: ', total);
            //total price 
            const expectedTotal = 113.95; // total price
            expect(total).to.equal(expectedTotal);

        })

    });
    it("Verify removing a product from cart", () => {
        cy.get(".product_sort_container").select("Price (low to high)");
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();
        cy.get('#add-to-cart-sauce-labs-fleece-jacket').click();
        cy.get('#add-to-cart-sauce-labs-onesie').click();
        cy.get('#shopping_cart_container').click();
        cy.get('#remove-sauce-labs-fleece-jacket').click();
        //verify product is not added in cart
        cy.get('#cart_contents_container').contains('Sauce Labs Fleece Jacket').should('not.exist')

    });
    afterEach('log test is completed', () => {
        cy.log('Test is completed')
    })

})