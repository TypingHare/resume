if (process.argv.length < 4) {
    console.error('Usage: bun build <resume-name> <out-path>')
    process.exit(1)
}

const [_exec, _scriptPath, resumeName, outPath] = process.argv

if (!resumeName) {
    console.error('Missing resume name argument.')
    process.exit(1)
}

if (!outPath) {
    console.error('Missing output path.')
    process.exit(1)
}

import path from 'path'
import type { Env, Heading } from './interfaces'
import { loadDataFromJson } from './data'
import { renderHeadingSection } from './sections'
import { loadTemplateContent, replaceTemplatePlaceholders } from './template'

const DATA_DIR = 'data'
const COMMON_DIR = path.join(DATA_DIR, 'common')
const RESUME_DIR = path.join(DATA_DIR, resumeName)

const env: Env = { commonDir: COMMON_DIR, resumeDir: RESUME_DIR }

async function build() {
    const heading = await loadDataFromJson<Heading>(env, 'heading')

    const contentItems: string[] = [await renderHeadingSection(heading)]
    const fileContent: string = replaceTemplatePlaceholders(
        await loadTemplateContent('main'),
        { content: contentItems.join('\n') }
    )
    await Bun.file(String(outPath)).write(fileContent)
}

build().then(() => console.log('Built resume successfully.'))
