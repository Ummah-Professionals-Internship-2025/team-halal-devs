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
  role: string;
  entries: AvailabilityEntry[];
}

export interface StudentProfessionalPair {
  id: number;
  student: AvailabilityResponse;
  professional: AvailabilityResponse;
  time_option: TimeOption;
  created_at: string;
}
