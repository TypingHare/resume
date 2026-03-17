import type { Env } from './interfaces'
import path from 'path'

/**
 * Resolves the JSON data file path for a dataset, preferring resume-specific
 * data before falling back to shared common data.
 *
 * @param environment Directory paths for resume-specific and shared data.
 * @param datasetName Dataset name without the `.json` extension.
 * @returns The absolute path to the matching JSON data file.
 * @throws {Error} When no matching data file exists in either location.
 */
export async function resolveDataFilePath(
    environment: Env,
    datasetName: string
): Promise<string> {
    const resumeDataFilePath = path.join(
        environment.resumeDir,
        datasetName + '.json'
    )
    if (await Bun.file(resumeDataFilePath).exists()) {
        return resumeDataFilePath
    }

    const sharedDataFilePath = path.join(
        environment.commonDir,
        datasetName + '.json'
    )
    if (await Bun.file(sharedDataFilePath).exists()) {
        return sharedDataFilePath
    }

    throw new Error(`No data file found: ${datasetName}`)
}

/**
 * Loads and parses a typed JSON dataset from the resolved data file path.
 *
 * @param environment Directory paths for resume-specific and shared data.
 * @param datasetName Dataset name without the `.json` extension.
 * @returns The parsed JSON content cast to the requested type.
 */
export async function loadDataFromJson<T>(
    environment: Env,
    datasetName: string
): Promise<T> {
    const dataFilePath = await resolveDataFilePath(environment, datasetName)
    return Bun.file(dataFilePath).json() as T
}
