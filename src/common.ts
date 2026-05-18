/**
 * Month abbreviations refers to the first 3-letter for the months.
 */
const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

/**
 * Parses a resume date string in `Mon YYYY` format into a `Date` positioned at
 * the first day of that month.
 *
 * @param dateStr Date string such as `May 2026`.
 * @returns A `Date` instance for the parsed month and year.
 */
export function parseDate(dateStr: string): Date {
    const monthAbbr = dateStr.slice(0, 3)
    const year = parseInt(dateStr.slice(4), 10)
    const monthIndex = monthAbbreviations.indexOf(monthAbbr)

    return new Date(year, monthIndex, 1)
}
