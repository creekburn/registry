export function identifier(packageName: string, version: string, handler?: string): string;
export function parseIdentifier(id: string): ParsedIdentifier;
export function lookup(id: string): Function;
/**
 * Parsed Identifier Information
 */
export type ParsedIdentifier = {
    /**
     * - npm package name
     */
    name: string;
    /**
     * - version of the npm package
     */
    version: string;
    /**
     * - `Handler` within the package.
     */
    handler: string;
    /**
     * - Path to file within package, instead of whats decalred in `package.main`.
     */
    path?: string;
};
//# sourceMappingURL=registry.d.ts.map