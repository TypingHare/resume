import { parseDate } from './common'
import type {
    EducationEntry,
    Heading,
    ProjectEntry,
    SkillEntry,
    WorkExperienceEntry,
} from './interfaces'
import { loadTemplateContent, replaceTemplatePlaceholders } from './template'

/**
 * Renders the resume heading section by populating the heading LaTeX template
 * with contact information from the heading data file.
 *
 * @param heading Heading data loaded from `heading.json`.
 * @returns The rendered heading section as a LaTeX string.
 */
export async function renderHeadingSection(heading: Heading): Promise<string> {
    const { name, email, mobile, website, location } = heading

    return replaceTemplatePlaceholders(await loadTemplateContent('heading'), {
        name,
        email,
        mobile,
        website,
        location,
    })
}

/**
 * Renders the education section as LaTeX resume subheadings sorted by
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
        '\\resumeSubHeadingListStart',
    ]

    educationEntries = educationEntries.sort((a, b) => {
        return (
            parseDate(a.graduationDate).getTime() -
            parseDate(b.graduationDate).getTime()
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
        } = educationEntries[i] as EducationEntry

        const gpaString = gpa ? `; GPA: ${gpa}/${maxGpa}` : ''

        lines.push(`\\resumeSubheading`)
        lines.push(`{${school}}`)
        lines.push(`{${location}}`)
        lines.push(`{${degree} in ${major}${gpaString}}`)
        lines.push(`{${enrollmentDate} -- ${graduationDate}}`)

        if (Number(i) !== educationEntries.length - 1) {
            lines.push(`\\vspace{6 pt}`)
        }
    }

    lines.push('\\resumeSubHeadingListEnd')

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
        '\\resumeSubHeadingListStart',
    ]

    workExperienceEntries = workExperienceEntries.sort((a, b) => {
        return (
            parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()
        )
    })

    for (const i in workExperienceEntries) {
        const { company, position, startDate, endDate, location, items } =
            workExperienceEntries[i] as WorkExperienceEntry

        lines.push(`\\resumeSubheading`)
        lines.push(`{${company}}`)
        lines.push(`{${location}}`)
        lines.push(`{${position}}`)
        lines.push(`{${startDate} -- ${endDate}}`)

        lines.push(`\\resumeItemListBelowSubHeadingStart`)
        for (const item of items) {
            lines.push(`\\resumeItemNoTitle{${item}}`)
        }
        lines.push(`\\resumeItemListBelowSubHeadingEnd`)
    }

    lines.push(`\\resumeSubHeadingListEnd`)

    return lines.join('\n')
}

export async function renderProjectsSection(
    projectEntries: ProjectEntry[]
): Promise<string> {
    const lines: string[] = [
        '\\section{Projects}',
        '\\resumeSubHeadingListStart',
        '\\resumeItemListStart',
    ]

    for (const i in projectEntries) {
        const { name, description } = projectEntries[i] as ProjectEntry
        lines.push(`\\resumeItem{${name}}{${description}}`)
    }

    lines.push(`\\resumeSubHeadingListEnd`)
    lines.push(`\\resumeItemListEnd`)

    return lines.join('\n')
}
