<a name="module_@creekburn/registry"></a>

## @creekburn/registry

* [@creekburn/registry](#module_@creekburn/registry)
    * _static_
        * [.identifier(packageName, version, handler)](#module_@creekburn/registry.identifier) ⇒ <code>string</code>
        * [.parseIdentifier(id)](#module_@creekburn/registry.parseIdentifier) ⇒ <code>ParsedIdentifier</code>
        * [.lookup(id)](#module_@creekburn/registry.lookup) ⇒ <code>function</code>
    * _inner_
        * [~ParsedIdentifier](#module_@creekburn/registry..ParsedIdentifier) : <code>Object</code>

<a name="module_@creekburn/registry.identifier"></a>

### @creekburn/registry.identifier(packageName, version, handler) ⇒ <code>string</code>
Creates an identifier for a `Handler` from the parts provided.

**Kind**: static method of [<code>@creekburn/registry</code>](#module_@creekburn/registry)  
**Returns**: <code>string</code> - Constructed Identifier for a `Handler`.  
**Throws**:

- When `packageName` is not a vald npm package name.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| packageName | <code>string</code> | Valid npm package name. |
| version | <code>string</code> | Valid version of the npm package to use during install. |
| handler | <code>string</code> | Name of the `Handler` in the package. This can start will a full file path to obtain a file other than what is declared in `package.main`. |

<a name="module_@creekburn/registry.parseIdentifier"></a>

### @creekburn/registry.parseIdentifier(id) ⇒ <code>ParsedIdentifier</code>
Convet an identifier to its parts for use in [lookup](lookup).

**Kind**: static method of [<code>@creekburn/registry</code>](#module_@creekburn/registry)  
**Returns**: <code>ParsedIdentifier</code> - Parsed Information  
**Throws**:

- When identifier cannot be parsed.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier for a `Handler`. |

<a name="module_@creekburn/registry.lookup"></a>

### @creekburn/registry.lookup(id) ⇒ <code>function</code>
Retrieve a `Handler` from a previously installed npm package.

**Kind**: static method of [<code>@creekburn/registry</code>](#module_@creekburn/registry)  
**Returns**: <code>function</code> - Handler located by Identifier.  
**Throws**:

- When import fails.
- When `Handler` not found in module.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identifier to lookup. |

<a name="module_@creekburn/registry..ParsedIdentifier"></a>

### @creekburn/registry~ParsedIdentifier : <code>Object</code>
Parsed Identifier Information

**Kind**: inner typedef of [<code>@creekburn/registry</code>](#module_@creekburn/registry)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | npm package name |
| version | <code>string</code> | version of the npm package |
| handler | <code>string</code> | `Handler` within the package. |
| [path] | <code>string</code> | Path to file within package, instead of whats decalred in the `package.main`. |

