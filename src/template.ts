/**
 * Loads the raw `.tex` template content for a named template.
 *
 * @param templateName Template filename without the `.tex` extension.
 * @returns The template file contents as a string.
 */
export async function loadTemplateContent(
    templateName: string
): Promise<string> {
    return await Bun.file('src/template/' + templateName + '.tex').text()
}

/**
 * Replaces all placeholder tokens in a template with their corresponding
 * values.
 *
 * @param templateContent Raw template content containing `<placeholder>`
 *     tokens.
 * @param placeholderValues Replacement values keyed by placeholder name.
 * @returns The populated template content.
 */
export function replaceTemplatePlaceholders(
    templateContent: string,
    placeholderValues: Record<string, string>
): string {
    let populatedTemplate = templateContent
    for (const [placeholderKey, replacementValue] of Object.entries(
        placeholderValues
    )) {
        populatedTemplate = populatedTemplate.replace(
            new RegExp(`<${placeholderKey}>`, 'g'),
            replacementValue
        )
    }

    return populatedTemplate
}
