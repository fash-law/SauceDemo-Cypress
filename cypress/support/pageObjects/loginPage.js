// cypress/pages/loginPage.js

class LoginPage {
    visit() {
        cy.visit("https://www.saucedemo.com/"); // URL
    }

    getEmailInput() {
        return cy.get('#user-name');
    }

    getPasswordInput() {
        return cy.get('#password');
    }

    getSubmitButton() {
        return cy.get('#login-button');
    }

    enterEmail(standard_user) {
        this.getEmailInput().type(standard_user);
    }

    enterPassword(secret_sauce) {
        this.getPasswordInput().type(secret_sauce);
    }

    submit() {
        this.getSubmitButton().click();
    }
}

export default LoginPage;
