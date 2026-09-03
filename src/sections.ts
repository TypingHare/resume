import { parseDate } from './common'
import type {
    EducationEntry,
    Header,
    ProjectEntry,
    SkillEntry,
    WorkExperienceEntry,
} from './interfaces'
import { loadTemplateContent, replaceTemplatePlaceholders } from './template'

/**
 * Renders the resume header section by populating the header LaTeX template
 * with contact information from the header data file.
 *
 * @param header Header data loaded from `header.json`.
 * @returns The rendered header section as a LaTeX string.
 */
export async function renderHeaderSection(header: Header): Promise<string> {
    const { name, email, mobile, linkedin, website } = header

    return replaceTemplatePlaceholders(await loadTemplateContent('header'), {
        name,
        email,
        mobile,
        linkedin,
        website,
    })
}

/**
 * Renders the education section as LaTeX resume subheaders sorted by
 * graduation date.
 *
 * @param educationEntries Education records loaded from `education.json`.
 * @returns The rendered education section as a LaTeX string.
 */
export async function renderEducationSection(
    educationEntries: EducationEntry[]
): Promise<string> {
    const lines: string[] = [
        '\\section{Education}',
        '\\resumeSubHeaderListStart',
    ]

    educationEntries = educationEntries.sort((a, b) => {
        return (
            parseDate(b.graduationDate).getTime() -
            parseDate(a.graduationDate).getTime()
        )
    })

    for (const i in educationEntries) {
        const {
            school,
            degree,
            major,
            gpa,
            maxGpa,
            enrollmentDate,
            graduationDate,
            location,
            scholarship,
        } = educationEntries[i] as EducationEntry

        const gpaString = gpa ? `; GPA: ${gpa}/${maxGpa}` : ''

        lines.push(`\\resumeSubheader`)
        lines.push(`{${school}}`)
        lines.push(`{${location}}`)
        lines.push(`{${degree} in ${major}${gpaString}}`)

        if (enrollmentDate) {
            lines.push(`{${enrollmentDate} -- ${graduationDate}}`)
        } else {
            lines.push(`{Expected ${graduationDate}}`)
        }

        if (scholarship) {
            lines.push(`\\par\\vspace{-4 pt}`)
            lines.push(`${scholarship}`)
        }

        if (Number(i) !== educationEntries.length - 1) {
            lines.push(`\\vspace{6 pt}`)
        }
    }

    lines.push('\\resumeSubHeaderListEnd')

    return lines.join('\n')
}

/**
 * Renders the skills section as a LaTeX list of skill categories and their
 * comma-separated items.
 *
 * @param skillEntries Skill categories loaded from `skills.json`.
 * @returns The rendered skills section as a LaTeX string.
 */
export async function renderSkillsSection(
    skillEntries: SkillEntry[]
): Promise<string> {
    const lines: string[] = ['\\section{Skills}', '\\resumeItemListStart']

    for (const i in skillEntries) {
        const { type, items } = skillEntries[i] as SkillEntry
        lines.push(`\\resumeItem{${type}}{${items.join(', ')}}`)
    }

    lines.push(`\\resumeItemListEnd`)

    return lines.join('\n')
}

export async function renderWorkExperienceSection(
    workExperienceEntries: WorkExperienceEntry[]
): Promise<string> {
    const lines: string[] = [
        '\\section{Work Experience}',
        '\\resumeSubHeaderListStart',
    ]

    workExperienceEntries = workExperienceEntries.sort((a, b) => {
        return (
            parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime()
        )
    })

    for (const i in workExperienceEntries) {
        const { company, position, startDate, endDate, location, items } =
            workExperienceEntries[i] as WorkExperienceEntry

        lines.push(`\\resumeSubheader`)
        lines.push(`{${position}}`)
        lines.push(`{${startDate} -- ${endDate}}`)
        lines.push(`{${company}}`)
        lines.push(`{${location}}`)

        lines.push(`\\resumeItemListBelowSubHeaderStart`)
        for (const item of items) {
            lines.push(`\\resumeItemNoTitle{${item}}`)
        }
        lines.push(`\\resumeItemListBelowSubHeaderEnd`)
    }

    lines.push(`\\resumeSubHeaderListEnd`)

    return lines.join('\n')
}

export async function renderProjectsSection(
    projectEntries: ProjectEntry[]
): Promise<string> {
    const lines: string[] = [
        '\\section{Projects}',
        '\\resumeSubHeaderListStart',
        '\\resumeItemListStart',
    ]

    for (const i in projectEntries) {
        const { name, description } = projectEntries[i] as ProjectEntry
        lines.push(`\\resumeItem{${name}}{${description}}`)
    }

    lines.push(`\\resumeSubHeaderListEnd`)
    lines.push(`\\resumeItemListEnd`)

    return lines.join('\n')
}
