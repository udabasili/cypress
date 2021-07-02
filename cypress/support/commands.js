// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';
//This allows to create a function to pass user credeintials
//It is not recommended to authenticate an app by  directly by inputing the data into login form
//the email data here would just be the default email
//after we create this command we can use in it in general -> tours by typing cy.login() in any of the test
//or even in before each
Cypress.Commands.add("login", (email = 'scott@yahoo.com') => {
//we start first by opening the window and wait for it to fully open
    cy.window().then(() => {
        //then visit the home page
        cy.visit("/")
        //then we make a post request with the authentication credentials
        cy.request({
            method : "POST",
            url: "https://myfakesite.com",
            body: {
                user: "scott",
                email
            }
        }).then(res => {
            //then we create a log in cypress
            Cypress.log({
                name: "Logged In"
            })
        })
    })
})
