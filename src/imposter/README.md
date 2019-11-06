# Imposter
Imposter is a mobile game designed to be played with 4-8 people.
It's basically a complete ripoff of Spyfall (https://spyfall.crabhat.com/).
Each round, you are either a bystander or the Imposter.
The bystanders are given a scenario and a role.
The Imposter lacks this information and needs to either choose the correct scenario from a long list or blend in until time runs out.
The player designated as first asks someone else a question about their role in the scenario. It's important to be vague enough so as not to tip off the Imposter.
Then, the player who answered asks someone else a question, and so on.
The game ends when time runs out or all the bystanders accuse the Imposter.

Imposter is made with React using Redux for state management.
It utilizes WebSockets for game events and on the server side, MongoDB stores game and player data.