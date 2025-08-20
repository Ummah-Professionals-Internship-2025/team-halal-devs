// src/types.ts

export interface TimeOption {
  id: number;
  start_time: string;
  end_time: string;
}

export interface AvailabilityEntry {
  time_option: TimeOption;
}

export interface AvailabilityResponse {
  id: number;
  participant_name: string;
  email: string;
  entries: AvailabilityEntry[];
}
