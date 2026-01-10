export interface Participant {
  id: string;
  name: string;
  um: string; // Unique Member ID / 工号
  department?: string;
}

export interface Prize {
  id: string;
  tier: string; // e.g., "一等奖"
  name: string;
  count: number; // Number of people to draw in this batch
  image?: string; // URL for the prize image
  winners: Participant[];
}

export interface AppState {
  participants: Participant[];
  prizes: Prize[];
  currentPrizeId: string | null;
  isRolling: boolean;
  displayParticipants: Participant[];
}

export interface User {
  id: string;
  name: string;
  createdAt: number;
}

export interface Project {
  id: string;
  ownerId?: string;
  name: string;
  password?: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  data: {
    participants: Participant[];
    prizes: Prize[];
  };
}