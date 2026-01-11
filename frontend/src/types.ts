export interface Participant {
  id: string;
  project_id: string;
  name: string;
  um: string;
  department?: string;
}

export interface Prize {
  id: string;
  project_id: string;
  tier: string;
  name: string;
  count: number;
  image?: string;
  order: number;
}

export interface Winner {
  id: string;
  project_id: string;
  prize_id: string;
  participant_id: string;
  won_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  password?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  participants: Participant[];
  prizes: Prize[];
  winners: Winner[];
}
