import { basename, dirname } from "path";
import packageNameValidator from "validate-npm-package-name";

/**
 * @module @creekburn/registry
 */

/**
 * Creates an identifier for a `Handler` from the parts provided.
 * @public
 * @function
 * @param {string} packageName Valid npm package name.
 * @param {string} version Valid version of the npm package to use during install.
 * @param {string} handler Name of the `Handler` in the package.
 * This can start will a full file path to obtain a file other than what is declared in `package.main`.
 * @returns {string} Constructed Identifier for a `Handler`.
 * @throws When `packageName` is not a vald npm package name.
 */
export const identifier = (packageName, version, handler) => {
  const validation = packageNameValidator(packageName);
  if (validation.validForNewPackages || validation.validForOldPackages) {
    if (!handler || handler === "default") {
      return `${packageName}@${version}`;
    } else {
      return `${packageName}@${version}!${handler}`;
    }
  } else {
    throw new Error(`Invalid package name: \n${validation.errors.join("\n")}`);
  }
};

/**
 * Parsed Identifier Information
 * @typedef {Object} ParsedIdentifier
 * @property {string} name - npm package name
 * @property {string} version - version of the npm package
 * @property {string} handler - `Handler` within the package.
 * @property {string} [path] - Path to file within package, instead of whats decalred in the `package.main`.
 */

/**
 * Convet an identifier to its parts for use in {@link lookup}.
 * @public
 * @function
 * @param {string} id Identifier for a `Handler`.
 * @returns {ParsedIdentifier} Parsed Information
 * @throws When identifier cannot be parsed.
 */
export const parseIdentifier = (id) => {
  const result = /^(@?[^@]+)@([^!]+)(!(.*))?$/.exec(id);
  if (result) {
    const [__, packageName, version, _, handler = "default"] = result;
    const parsed = {
      handler,
      name: packageName,
      version
    };
    if (basename(handler) !== handler) {
      parsed.path = dirname(handler);
      parsed.handler = basename(handler);
    }
    return parsed;
  } else {
    throw new Error(`Invalid Identifier [${id}]`);
  }
};

/**
 * Retrieve a `Handler` from a previously installed npm package.
 * @public
 * @function
 * @async
 * @param {string} id Identifier to lookup.
 * @returns {function} Handler located by Identifier.
 * @throws When import fails.
 * @throws When `Handler` not found in module.
 */
export const lookup = async (id) => {
  const { name, path = "", handler } = parseIdentifier(id);
  const location = `${name}${path}`;

  const module = await import(location);

  if (handler in module) {
    return module[handler];
  } else {
    throw new Error(`Handler [${handler}] not found in [${location}]`);
  }
};
