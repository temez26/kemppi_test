# kemppi_test

## Overview
This project aims to schedule workshops in rounds so that every participant visits each workshop exactly once.

## Components

### User Input Form
A component where users input the number of participants (`userCount`) and the group size (`groupSize`).

### Rounds Display
A component that displays the workshop data and allows switching between rounds.

### Data Model
A `Data` class that:
- Defines the models for participants, workshops, and rounds.
- Implements the round-robin scheduling logic by arranging participants in a matrix and rotating columns.  
  _Note:_ Although this ensures that every participant is assigned to each workshop, the groups remain the same across rounds.

### Handler Service
A service that uses Observables to manage and share application data, making it easy for the Rounds component to subscribe to data updates.

## Final Conclusion
- The system dynamically calculates the number of workshops: it is determined by dividing the total number of participants by the group size (e.g., with 10 participants and a group size of 5, there are 2 workshops, hence 2 rounds).
- While every participant is scheduled to visit each workshop exactly once, the current implementation results in identical group compositions across rounds.
- one user is represented just as certain number
- Time used about 3h
