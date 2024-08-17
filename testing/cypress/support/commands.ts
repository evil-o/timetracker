/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

require("cypress-delete-downloads-folder").addCustomCommand();

export {};

declare global {
    namespace Cypress {
        interface Chainable {
            byTestId: typeof byTestId;
            getLastDownloadFilePath: typeof getLastDownloadFilePath;
            findByTestId: (
                testId: string
            ) => Cypress.Chainable<JQuery<HTMLElement>>;
            //       login(email: string, password: string): Chainable<void>
            //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}

function byTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid="${testId}"]`);
}

Cypress.Commands.add("byTestId", byTestId);

function findByTestId(
    subject: JQuery<HTMLElement>,
    testId: string
): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.wrap(subject).find(`[data-testid="${testId}"]`);
}

Cypress.Commands.add("findByTestId", { prevSubject: "element" }, findByTestId);

function getLastDownloadFilePath(): Cypress.Chainable<string> {
    const downloadsFolder = Cypress.config("downloadsFolder");
    return cy
        .task("getFilesOrderedByTime", { path: downloadsFolder })
        .then((results) => {
            if (results === undefined) {
                throw new Error(`Last download not found.`);
            }
            return cy.wrap<string>((results as any[])[0]);
        });
}

Cypress.Commands.add("getLastDownloadFilePath", getLastDownloadFilePath);

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
