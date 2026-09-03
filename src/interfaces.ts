/**
 * Directory locations used to resolve resume-specific and shared data files.
 *
 * @property commonDir Path to the shared data directory used as a fallback.
 * @property resumeDir Path to the resume-specific data directory.
 */
export interface Env {
    commonDir: string
    resumeDir: string
}

/**
 * Resume header content injected into the header LaTeX template.
 *
 * @property name Full name displayed in the header.
 * @property email Email address shown in the header contact details.
 * @property mobile Phone number shown in the header contact details.
 * @property linkedin URL to LinkedIn profile.
 * @property website Personal website or profile link shown in the header.
 * @property location Location text shown in the header.
 */
export interface Header {
    name: string
    email: string
    mobile: string
    linkedin: string
    website: string
    location: string
}

/**
 * Education record loaded from `education.json` and rendered in the education
 * section.
 *
 * @property school School name displayed in the education entry.
 * @property degree Degree name displayed in the education entry.
 * @property major Major or field of study paired with the degree.
 * @property gpa Earned GPA shown in the education details line.
 * @property maxGpa Maximum GPA scale used alongside `gpa`.
 * @property enrollmentDate Start date shown for the education entry.
 * @property graduationDate End or graduation date used for display and sorting.
 * @property location Location displayed for the school.
 * @property scholarship Optional scholarship or award information shown in the
 *   education entry.
 */
export interface EducationEntry {
    school: string
    degree: string
    major: string
    gpa: string
    maxGpa: string
    enrollmentDate: string
    graduationDate: string
    location: string
    scholarship?: string
}

/**
 * Skill category loaded from `skills.json` and rendered as a grouped resume
 * item.
 *
 * @property type Skill category label such as `Languages` or `Frameworks`.
 * @property items Individual skills rendered as a comma-separated list.
 */
export interface SkillEntry {
    type: string
    items: string[]
}

/**
 * Work experience record intended for rendering in an experience section.
 *
 * @property company Company name for the experience entry.
 * @property position Job title or role held at the company.
 * @property startDate Start date shown for the experience entry.
 * @property endDate End date shown for the experience entry, or `null` if
 *     ongoing.
 * @property location Location displayed for the experience entry.
 * @property items Bullet points or accomplishments for the experience entry.
 */
export interface WorkExperienceEntry {
    company: string
    position: string
    startDate: string
    endDate: string | null
    location: string
    items: string[]
}

/**
 * Project record intended for rendering in a projects section.
 *
 * @property name Project name displayed in the projects section.
 * @property description Short summary of the project.
 */
export interface ProjectEntry {
    name: string
    description: string
}
