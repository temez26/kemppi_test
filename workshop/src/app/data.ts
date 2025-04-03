export interface Participant {
  id: number;
}
export interface Workshop {
  id: number;
  leader: number;
  participants: Participant[];
}
export interface RoundAssignment {
  round: number;
  workshops: Workshop[];
}
export class Data {
  totalParticipants: number;
  groupSize: number;
  roundCount: number;
  participants: Participant[] = [];
  rounds: RoundAssignment[] = [];
  currentRound: number = 0;

  constructor(totalParticipants: number, groupSize: number) {
    this.totalParticipants = totalParticipants;
    this.groupSize = groupSize;
    this.participants = this.generateParticipants();

    if (totalParticipants % groupSize !== 0) {
      console.error('Total participants must be divisible by group size');
      this.roundCount = 0;
    } else {
      this.roundCount = totalParticipants / groupSize;
    }
  }

  generateParticipants(): Participant[] {
    const list: Participant[] = [];
    for (let i = 1; i <= this.totalParticipants; i++) {
      list.push({ id: i });
    }
    return list;
  }

  // Generates rounds so that every participant attends every workshop exactly once.
  // Precondition: totalParticipants must be divisible by groupSize.
  generateRounds(): void {
    if (this.roundCount === 0) {
      return;
    }

    const workshopCount = this.roundCount;
    // Arrange participants in a matrix with groupSize rows and workshopCount columns.
    const matrix: Participant[][] = [];
    for (let i = 0; i < this.groupSize; i++) {
      matrix[i] = [];
    }
    // Sort participants (optional) to have a deterministic order.
    const sorted = [...this.participants].sort((a, b) => a.id - b.id);
    let index = 0;
    for (let row = 0; row < this.groupSize; row++) {
      for (let col = 0; col < workshopCount; col++) {
        matrix[row][col] = sorted[index++];
      }
    }

    this.rounds = [];
    // For each round, rotate the columns so that participants get assigned to different workshop.
    for (let r = 0; r < this.roundCount; r++) {
      const workshops: Workshop[] = [];
      for (let w = 0; w < workshopCount; w++) {
        // Determine which column to use for this workshop in this round
        const colIndex = (w + r) % workshopCount;
        const group: Participant[] = [];
        for (let row = 0; row < this.groupSize; row++) {
          group.push(matrix[row][colIndex]);
        }
        workshops.push({
          id: 1000 + w,
          leader: 2000 + w,
          participants: group,
        });
      }
      this.rounds.push({ round: r, workshops });
    }
  }
}
