export type UserRole = 'admin' | 'clinic_admin' | 'professional' | 'family';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  clinicId?: string;
}

export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  guardianId: string;
  professionalId: string;
  clinicId: string;
  avatar?: string;
  diagnosis?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  clinicId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

export interface Session {
  id: string;
  appointmentId: string;
  patientId: string;
  professionalId: string;
  date: string;
  feedback: string;
  metrics?: Record<string, any>;
  attachments?: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'session' | 'message' | 'system';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
