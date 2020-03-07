# Imposter
Imposter is a mobile game designed to be played with 4-12 people in the same room.
Use deception, subtlety, and improvisation to identify the Imposter among you.
Imposter is heavily inspired by Spyfall (https://spyfall.crabhat.com/).

### Rules
Each round, you are either a bystander or the Imposter.
The bystanders are given a scenario, and a role.
The Imposter lacks this information and needs to either choose the correct scenario from a long list or stall until time runs out.

### Gameplay
The player designated as first asks someone else a question about their role in the scenario. It's important to be vague enough so as not to tip off the Imposter.
Then, the player who answered asks someone else a question, and so on.
The game ends when time runs out or all the bystanders accuse the Imposter.

### How It Works
I started Imposter with the intent to design a real-time web application that supports multiple clients.
Imposter's frontend is made with React using Redux for state management and sagas for handling asynchronous actions.
The backend uses WebSockets for game events and MongoDB with Mongoose for storing game data.