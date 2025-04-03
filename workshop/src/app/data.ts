export interface Participant {
  id: number;
}
export interface Workshop {
  id: number;
  leader: Participant;
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
    this.roundCount = totalParticipants / groupSize;
  }

  generateParticipants(): Participant[] {
    const list: Participant[] = [];
    for (let i = 1; i <= this.totalParticipants; i++) {
      list.push({ id: i });
    }
    return list;
  }
}
