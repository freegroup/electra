/**
 * Abstract Base Class for Brains Persistence.
 * All methods must return a Promise that resolves to a Readable Stream.
 *
 * All methods accept an optional `authHeaders` object with ingress-injected
 * headers (x-role, x-mail, x-hash, ...) so implementations that call
 * external services can forward them. The FileSystemAdapter ignores it.
 */
class PersistenceInterface {

    /**
     * List files in a directory.
     * @param {string} tenant  "global" | "shared" | "user:<hash>"
     * @param {string} subDir  Sub-path prefix to list under
     * @param {Object} [authHeaders]  Ingress headers to forward
     * @returns {Promise<ReadableStream>} Stream containing JSON {files: [...]}
     */
    listFiles(tenant, subDir, authHeaders) {
        throw new Error("Method 'listFiles' must be implemented.");
    }

    /**
     * Get a JSON file.
     * @param {string} tenant
     * @param {string} filePath
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    getJSONFile(tenant, filePath, authHeaders) {
        throw new Error("Method 'getJSONFile' must be implemented.");
    }

    /**
     * Get a Binary file (e.g. image).
     * @param {string} tenant
     * @param {string} filePath
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    getBinaryFile(tenant, filePath, authHeaders) {
        throw new Error("Method 'getBinaryFile' must be implemented.");
    }

    /**
     * Rename a file or directory.
     * @param {string} tenant
     * @param {string} fromPath
     * @param {string} toPath
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    rename(tenant, fromPath, toPath, authHeaders) {
        throw new Error("Method 'rename' must be implemented.");
    }

    /**
     * Copy a file between tenants (or within same tenant).
     * @param {string} fromTenant
     * @param {string} fromPath
     * @param {string} toTenant
     * @param {string} toPath
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    copy(fromTenant, fromPath, toTenant, toPath, authHeaders) {
        throw new Error("Method 'copy' must be implemented.");
    }

    /**
     * Delete a file or directory.
     * @param {string} tenant
     * @param {string} filePath
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    delete(tenant, filePath, authHeaders) {
        throw new Error("Method 'delete' must be implemented.");
    }

    /**
     * Create a folder.
     * @param {string} tenant
     * @param {string} subDir
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    createFolder(tenant, subDir, authHeaders) {
        throw new Error("Method 'createFolder' must be implemented.");
    }

    /**
     * Write content to a file.
     * @param {string} tenant
     * @param {string} filePath
     * @param {string|Buffer} content
     * @param {Object} [authHeaders]
     * @returns {Promise<ReadableStream>}
     */
    writeFile(tenant, filePath, content, authHeaders) {
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
