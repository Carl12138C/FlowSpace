import user from "../fixtures/profile.json";
import tasks from "../fixtures/task.json";

const randUser = user.user1;
const task = tasks[Math.floor(Math.random() * tasks.length)];

describe("Task List Page", () => {
    beforeEach(() => {
        cy.visit("localhost:5173/");
        cy.login(randUser.email, randUser.password);
        cy.contains("CONVERSATIONS");
        cy.get('[data-cy="link-tasklist"]').click()
        cy.contains('My Tasks')
    });

    it("Add a new Task", () => {
        cy.get('[data-cy="button-add-task"]').click();
        cy.get('[data-cy="input-task-title"]').type(task.title);
        cy.get('[data-cy="input-task-description"]').type(
            task.Description
        );
        cy.get('[data-cy="button-submit"]').click()

        cy.request(
            "GET",
            `${Cypress.env("api_server")}/firebase/getusertask?uid=${randUser.uid}`)
            .then((response) => {
            const dataArray = response.body.data;

            const validateTitle = dataArray.some(tasks => tasks.title === task.title);
            expect(validateTitle).true
        });
    });

    it("Edit Task", () => {
        cy.get('[data-cy="button-edit-task"]').first().click()
        cy.contains('Edit Task')

        const newTitle = task.title + (new Date().getTime())

        cy.get('[data-cy="input-edit-title"]').clear().type(newTitle);
        cy.get('[data-cy="button-edit-submit"]').click();

        cy.request(
            "GET",
            `${Cypress.env("api_server")}/firebase/getusertask?uid=${randUser.uid}`)
            .then((response) => {
            const dataArray = response.body.data;

            const validateTitle = dataArray.some(tasks => tasks.title === task.title);
            expect(validateTitle).true
        });
    })

    it("Remove Task", () => {
        let length;
        cy.get('[data-cy="item-task"]').its('length').then(num => {
            length = num
        })

        if(length === 1) {
            cy.fail("No Task to remove")
        }

        cy.get('[data-cy="button-remove-task"]').first().click();

        cy.request(
            "GET",
            `${Cypress.env("api_server")}/firebase/getusertask?uid=${randUser.uid}`)
            .then((response) => {
            const dataArray = response.body.data;
            console.log(dataArray.length)
            expect((dataArray.length || 0) < length).true
        });
    })
});
