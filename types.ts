export enum ServiceStatus {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Andamento',
  COMPLETED = 'Concluído'
}

export enum WithdrawalCategory {
  PERSONAL = 'Pessoal',
  OPERATIONAL = 'Operacional',
  OTHERS = 'Outros'
}

export interface Service {
  id: string;
  client: string;
  description: string;
  startDate: string; // ISO Date string YYYY-MM-DD
  endDate?: string; // ISO Date string YYYY-MM-DD
  status: ServiceStatus;
  value: number;
}

export interface Withdrawal {
  id: string;
  date: string; // ISO Date string YYYY-MM-DD
  description: string;
  category: WithdrawalCategory;
  value: number;
}

export type TabType = 'services' | 'withdrawals';