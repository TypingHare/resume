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
import type {
    EducationEntry,
    Env,
    Header,
    ProjectEntry,
    SkillEntry,
    WorkExperienceEntry,
} from './interfaces'
import { loadDataFromJson } from './data'
import {
    renderEducationSection,
    renderHeaderSection,
    renderProjectsSection,
    renderSkillsSection,
    renderWorkExperienceSection,
} from './sections'
import { loadTemplateContent, replaceTemplatePlaceholders } from './template'

const DATA_DIR = 'data'
const COMMON_DIR = path.join(DATA_DIR, 'common')
const RESUME_DIR = path.join(DATA_DIR, resumeName)

const env: Env = { commonDir: COMMON_DIR, resumeDir: RESUME_DIR }

async function build() {
    const header = await loadDataFromJson<Header>(env, 'header')
    const educationEntries = await loadDataFromJson<EducationEntry[]>(
        env,
        'education'
    )
    const skillEntries = await loadDataFromJson<SkillEntry[]>(env, 'skills')
    const workExperienceEntries = await loadDataFromJson<WorkExperienceEntry[]>(
        env,
        'work-experience'
    )
    const projectEntries = await loadDataFromJson<ProjectEntry[]>(
        env,
        'projects'
    )

    const contentItems: string[] = [
        await renderHeaderSection(header),
        await renderEducationSection(educationEntries),
        "\\vspace{5pt}",
        await renderWorkExperienceSection(workExperienceEntries),
        await renderProjectsSection(projectEntries),
        "\\vspace{5pt}",
        await renderSkillsSection(skillEntries),
    ]

    const fileContent: string = replaceTemplatePlaceholders(
        await loadTemplateContent('main'),
        { content: contentItems.join('\n') }
    )
    await Bun.file(String(outPath)).write(fileContent)
}

build().then(() => console.log('Built resume successfully.'))
