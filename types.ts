export interface ImmigrationRecord {
  id: number;
  date: string;
  township: string;
  household: number;
  male: number;
  female: number;
  smart_card: number;
  taang: number;
  shan: number;
  bamar: number;
  revenue: number;
}

export interface FormDataState {
  township: string;
  date: string;
  household: number | string;
  male: number | string;
  female: number | string;
  smart_card: number | string;
  taang: number | string;
  shan: number | string;
  bamar: number | string;
}