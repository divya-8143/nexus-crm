export interface PatientAccount {
  id: string;
  patientRecordNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'UNDISCLOSED';
  primaryInsuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  hipaaConsentSignedAt: string;
  primaryCarePhysicianId?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  chronicCarePrograms: string[];
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  notesCount: number;
}

export interface ClinicalAppointment {
  id: string;
  patientId: string;
  providerId: string;
  appointmentType: 'CONSULTATION' | 'FOLLOW_UP' | 'ROUTINE_CHECKUP' | 'URGENT_CARE' | 'TELEHEALTH';
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: 'SCHEDULED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  telehealthRoomUrl?: string;
  clinicalNotesSummary?: string;
}

export class HealthcareComplianceEngine {
  public static verifyHipaaConsent(patient: PatientAccount): boolean {
    if (!patient.hipaaConsentSignedAt) return false;
    const consentDate = new Date(patient.hipaaConsentSignedAt);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return consentDate > oneYearAgo;
  }

  public static sanitizePhiForLogging(patient: PatientAccount): Record<string, any> {
    return {
      id: patient.id,
      patientRecordNumber: patient.patientRecordNumber,
      insuranceProvider: patient.primaryInsuranceProvider,
      riskTier: patient.riskTier,
      hipaaConsentValid: this.verifyHipaaConsent(patient),
    };
  }
}
