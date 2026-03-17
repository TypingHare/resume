import type { Heading } from './interfaces'
import { loadTemplateContent, replaceTemplatePlaceholders } from './template'

/**
 * Renders the resume heading section by filling the heading template with the
 * provided contact details.
 *
 * @param heading Heading data to inject into the template.
 * @returns The rendered heading section as a string.
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
