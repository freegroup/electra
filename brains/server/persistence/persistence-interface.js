/**
 * Abstract Base Class for Brains Persistence.
 * All methods must return a Promise that resolves to a Readable Stream.
 */
class PersistenceInterface {
    
    /**
     * List files in a directory.
     * @param {string} tenant - The tenant identifier (e.g. "global", "shared", "user:<hash>")
     * @param {string} subDir - The subdirectory to list
     * @returns {Promise<ReadableStream>} Stream containing JSON result {files: [...]}
     */
    listFiles(tenant, subDir) {
        throw new Error("Method 'listFiles' must be implemented.");
    }

    /**
     * Get a JSON file.
     * @param {string} tenant 
     * @param {string} filePath 
     * @returns {Promise<ReadableStream>} Stream containing the file content
     */
    getJSONFile(tenant, filePath) {
        throw new Error("Method 'getJSONFile' must be implemented.");
    }

    /**
     * Get a Binary file (e.g. image).
     * @param {string} tenant 
     * @param {string} filePath 
     * @returns {Promise<ReadableStream>} Stream containing the binary content
     */
    getBinaryFile(tenant, filePath) {
        throw new Error("Method 'getBinaryFile' must be implemented.");
    }

    /**
     * Rename a file or directory.
     * @param {string} tenant 
     * @param {string} fromPath 
     * @param {string} toPath 
     * @returns {Promise<ReadableStream>} Stream containing JSON result {name, filePath, ...}
     */
    rename(tenant, fromPath, toPath) {
        throw new Error("Method 'rename' must be implemented.");
    }

    /**
     * Copy a file between tenants (or within same tenant).
     * @param {string} fromTenant 
     * @param {string} fromPath 
     * @param {string} toTenant 
     * @param {string} toPath 
     * @returns {Promise<ReadableStream>} Stream containing JSON result {filePath: ...}
     */
    copy(fromTenant, fromPath, toTenant, toPath) {
        throw new Error("Method 'copy' must be implemented.");
    }

    /**
     * Delete a file or directory.
     * @param {string} tenant 
     * @param {string} filePath 
     * @returns {Promise<ReadableStream>} Stream containing "true" (as string) or success message
     */
    delete(tenant, filePath) {
        throw new Error("Method 'delete' must be implemented.");
    }

    /**
     * Create a folder.
     * @param {string} tenant 
     * @param {string} subDir 
     * @returns {Promise<ReadableStream>} Stream containing JSON result {name, filePath, ...}
     */
    createFolder(tenant, subDir) {
        throw new Error("Method 'createFolder' must be implemented.");
    }

    /**
     * Write content to a file.
     * @param {string} tenant 
     * @param {string} filePath 
     * @param {string|Buffer} content 
     * @returns {Promise<ReadableStream>} Stream containing JSON result {name, filePath, ...}
     */
    writeFile(tenant, filePath, content) {
        throw new Error("Method 'writeFile' must be implemented.");
    }

    /**
     * Get the name of the persistence adapter.
     * @returns {string} Name of the adapter
     */
    getName() {
        throw new Error("Method 'getName' must be implemented.");
    }
}

module.exports = PersistenceInterface;
