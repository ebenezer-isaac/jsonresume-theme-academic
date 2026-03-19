/** JSON Resume schema types with academic theme extensions. */

export interface ResumeLocation {
  readonly address?: string;
  readonly postalCode?: string;
  readonly city?: string;
  readonly countryCode?: string;
  readonly region?: string;
}

export interface ResumeProfile {
  readonly network?: string;
  readonly username?: string;
  readonly url?: string;
}

export interface ResumeBasics {
  readonly name?: string;
  readonly label?: string;
  readonly image?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly url?: string;
  readonly summary?: string;
  readonly location?: ResumeLocation;
  readonly profiles?: readonly ResumeProfile[];
}

export interface ResumeSkill {
  readonly name?: string;
  readonly level?: string;
  readonly keywords?: readonly string[];
}

export interface ResumeWorkEntry {
  readonly name?: string;
  readonly position?: string;
  readonly url?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly summary?: string;
  readonly highlights?: readonly string[];
}

export interface ResumeEducationEntry {
  readonly institution?: string;
  readonly url?: string;
  readonly area?: string;
  readonly studyType?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly score?: string;
  readonly courses?: readonly string[];
}

export interface ResumeProject {
  readonly name?: string;
  readonly description?: string;
  readonly highlights?: readonly string[];
  readonly keywords?: readonly string[];
  readonly startDate?: string;
  readonly endDate?: string;
  readonly url?: string;
  readonly roles?: readonly string[];
  readonly entity?: string;
  readonly type?: string;
}

export interface ResumeVolunteerEntry {
  readonly organization?: string;
  readonly position?: string;
  readonly url?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly summary?: string;
  readonly highlights?: readonly string[];
}

export interface ResumeCertificate {
  readonly name?: string;
  readonly date?: string;
  readonly issuer?: string;
  readonly url?: string;
}

export interface ResumeInterest {
  readonly name?: string;
  readonly keywords?: readonly string[];
}

export interface ResumeLanguage {
  readonly language?: string;
  readonly fluency?: string;
}

export interface ResumeReference {
  readonly name?: string;
  readonly reference?: string;
}

export interface ResumeMeta {
  readonly canonical?: string;
  readonly version?: string;
  readonly lastModified?: string;
  readonly headings?: Readonly<Partial<Record<string, string>>>;
  readonly months?: Readonly<Partial<Record<string, string>>>;
}

export interface ResumeSchema {
  readonly basics?: ResumeBasics;
  readonly work?: readonly ResumeWorkEntry[];
  readonly volunteer?: readonly ResumeVolunteerEntry[];
  readonly education?: readonly ResumeEducationEntry[];
  readonly skills?: readonly ResumeSkill[];
  readonly projects?: readonly ResumeProject[];
  readonly certificates?: readonly ResumeCertificate[];
  readonly interests?: readonly ResumeInterest[];
  readonly languages?: readonly ResumeLanguage[];
  readonly references?: readonly ResumeReference[];
  readonly meta?: ResumeMeta;
}
