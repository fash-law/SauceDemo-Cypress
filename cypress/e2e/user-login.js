import LoginPage from "../support/pageObjects/LoginPage";
/// <reference types="cypress" />

describe("Confirm User Login", () => {
    it("Verify Login Using Valid Credentials", () => {

        const loginpage = new LoginPage()

        loginpage.visit();
        loginpage.enterEmail('standard_user');
        loginpage.enterPassword('secret_sauce');
        loginpage.submit();
        // cy.visit("https://www.saucedemo.com/");
        // cy.get("#user-name").type('standard_user');
        // cy.get("#password").type('secret_sauce');
        // cy.get("#login-button").click();
        cy.get(".app_logo").should('contain.text', "Swag Labs");
        cy.get(".title").contains('Products')  //user is directed to product listing page
        cy.url().should('contain', "inventory.html")  //verify the url is correct

    });

    it("Verify User is Redirected Back To The Login Page after Logout", () => {

        const loginpage = new LoginPage()

        loginpage.visit();
        loginpage.enterEmail('standard_user');
        loginpage.enterPassword('secret_sauce');
        loginpage.submit();

        // cy.visit("https://www.saucedemo.com/");
        // cy.get("#user-name").type('standard_user');
        // cy.get("#password").type('secret_sauce');
        // cy.get("#login-button").click();
        cy.get(".bm-burger-button").click();
        cy.get("#logout_sidebar_link").click();
        cy.url().should('contain', "saucedemo.com");   //verify the logout function

    });

    it("Confirm Login using Invalid Credentials", () => {

        const loginpage = new LoginPage()

        loginpage.visit();
        loginpage.enterEmail('standard_user');
        loginpage.enterPassword('sauce');
        loginpage.submit();
        // cy.visit("https://www.saucedemo.com/");
        // cy.get("#user-name").type('standard_user');
        // cy.get("#password").type('secret');
        // cy.get("#login-button").click();
        cy.get('div[class="error-message-container error"]').should('be.visible').and('to.include.text', " Username and password do not match");

    });
    afterEach('log test is completed', () => {
        cy.log('Test is completed')
    })

})