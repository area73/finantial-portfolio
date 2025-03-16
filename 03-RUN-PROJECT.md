# How to Run the Project

To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Install the dependencies with the command `npm install`.

4. Run the command `npm run dev` to start the dev server.
5. Open your browser and navigate to http://localhost:5173/

Alternative you can also build the project with `npm run build`

## TEST

### Unit test

I create most of the unit test.
My approach for unit testing is to test non visual components , mos of the time functions
to start unit test please run

```bash
npm run test
```

This will run vitest in watch mode

### component test

Here we will test any component useful and that has a visual representation
These test have been made with cypress but with component view (not e2e).

My approach for these test is to do them along with visual regression test because in most of the cases you can
fulfill all your asetions requirements with a single snapshot
You can see more comment about these matter on this test:

**src/components/charts/DonutChart.cy.tsx**

### Automatic visual regression test

As I said previously I made some visual regression test for components , I think it is a valuable way
of keeping everythind under visual control.

To run the visual test you can do it in different ways:

```bash
npm run cypress:open # runs cypress headless
npm run cypress:run # opens cypress
npm cypress:cleanup # handy utility to cleanup unused spanshots
```

**HINT:** if you modify a component you can see the diff changes from cypress and accept their changes.

![frsource-visual-testing-example](https://user-images.githubusercontent.com/10456649/191988386-2be2ea14-7b7a-4048-a14e-0cad8d21e214.gif)

### Functional test

Do to time contrains I didn't create any functional or e2e test, the idea will be to do it with cypress

## LINT

To run the linter, use the command `npm run lint`.

## About use of MSW and service workers

MSW (Mock Service Worker) is a powerful tool used in front-end development for mocking HTTP requests. It intercepts requests at the network level, allowing developers to simulate API responses without needing a real backend server. This is particularly useful for testing, development, and prototyping.
