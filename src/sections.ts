import { parseDate } from './common'
import type { EducationEntry, Heading, SkillEntry } from './interfaces'
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

        lines.push(`\\resumeSubheading`)
        lines.push(`{${school}}`)
        lines.push(`{${location}}`)
        lines.push(`{${degree} in ${major}; GPA: ${gpa}/${maxGpa}}`)
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
 * @param skills Skill categories loaded from `skills.json`.
 * @returns The rendered skills section as a LaTeX string.
 */
export async function renderSkillsSection(
    skills: SkillEntry[]
): Promise<string> {
    const lines: string[] = ['\\section{Skills}', '\\resumeItemListStart']

    for (const i in skills) {
        const { type, items } = skills[i] as SkillEntry
        lines.push(`\\resumeItem{${type}}{${items.join(', ')}}`)
    }

    lines.push(`\\resumeItemListEnd`)

    return lines.join('\n')
}
