# Bowling Scoreboard In React

- This is a Bowling scoreboard
- Built in React (17) with TypeScript
- For tests I'm using jest with Enzyme
- Project base created from 'npx create-react-app@latest <projectName> --template typescript'

## Prerequisites

---

1.  node installed
2.  npm
3.  Visual studio code

## How to run

---

- Open project with VS code
- Run `npm start` command in terminal
- Click `New Game` button to start the game
- At any time to restart the game
  - Refreshing the page will clear all scores and user will have to start from scratch
  - User can click on `Restart Game` button
- To score Press the appropriate number buttons
- After 10 frames Final score will be shown at the bottom of the page

## How to test

---

- Open new terminal in VS code
- Run `npm test` command in terminal
- I've written some basic and advanced render tests for the scoreboard and other controls

## My Approach

---

- I started by creating a basic score board so that dev and testing of logic gets easier in further steps
- I'm using tables for the scoreboard
- I'm using functional components in the application although same can be achieved by using the Class components as well
- Score calculation:
  - After every bowl I'm looking for last 2 frames score status to calculate the strike and spare values for previous frames
  - I'm getting the unscored frames in 1 go. Same can be achieved using recursive logic as well
  - 10th frame calculation:
    - in 10th frame user can roll 3 times according to normal Bowling rules of scoring.
    - if the user strikes in first Bowl, he/she gets a chance to roll 2 more times there by either getting 2 strikes or a spare or normal 2 frame score
    - If the user scores a spare in first 2 bowls then they get the 3rd bowl to comlete the score.

## Improvements

---

- I used the table component for creating the score board due to time constraints. Table components increases the repetition of the code and the page is also tedious.
- Ideally I would preffer to use a block for 1 frame with flex css styling. This makes the code more readble and less prone to errors and render issues
- This would also benefit with the styling options withiout cluttering the jsx
- I'm using components local state for keeping the scores. Better way would be to go with global states using Redux
- I've written only Render tests. Some usint tests for testing the score logic also neeeds to be implemented
- off-course the solution still needs some refactoring
- Can add multiplayer support in future

## Comments

---

I have added some minor comments every where in code to explain my mindset while taking that decision. Usually I want my code to be self-explanatory and avoid comments unless absolutely needed.
My approach in this project was to start with minimum required and then extend when needed.

Looking forward to the feedback. Many Thanks!
