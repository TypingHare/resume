export interface Env {
    commonDir: string
    resumeDir: string
}

export interface Heading {
    name: string
    email: string
    mobile: string
    website: string
    location: string
}

export interface EducationEntry {
    school: string
    degree: string
    major: string
    gpa: string
    maxGpa: string
    enrollmentDate: string
    graduationDate: string
    location: string
}

export interface TechnicalSkillEntry {
    type: string
    items: string[]
}

export interface ExperienceEntry {
    company: string
    position: string
    startDate: string
    endDate: string | null
    location: string
    items: string[]
}

export interface ProjectEntry {
    name: string
    description: string
}
