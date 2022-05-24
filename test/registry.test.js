import test from "ava";
import { identifier, parseIdentifier, lookup } from "../src/registry.js";

test("identifier :: creates valid identifier", (t) => {
  t.is(identifier("package-name", "0.0.0", "handler"), "package-name@0.0.0!handler");
});

test("identifier :: default handler omits !", (t) => {
  t.is(identifier("package-name", "0.0.0", "default"), "package-name@0.0.0");
});

test("identifier :: throws when package-name is invalid", (t) => {
  t.throws(() => {
    identifier("_package-name", "0.0.0", "default");
  });
});

test("parseIdentifier :: extracts identifier parts", (t) => {
  const result = parseIdentifier("package-name@0.0.0!handler");
  t.is(result.name, "package-name");
  t.is(result.version, "0.0.0");
  t.is(result.handler, "handler");
});

test("parseIdentifier :: extracts handler with path", (t) => {
  const result = parseIdentifier("package-name@0.0.0!/file/path/handler");
  t.is(result.name, "package-name");
  t.is(result.version, "0.0.0");
  t.is(result.handler, "handler");
  t.is(result.path, "/file/path");
});

test("parseIdentifier :: sets handler to default when not provided", (t) => {
  const result = parseIdentifier("package-name@0.0.0");
  t.is(result.name, "package-name");
  t.is(result.version, "0.0.0");
  t.is(result.handler, "default");
});

test("parseIdentifier :: throws when invalid", (t) => {
  const error = t.throws(() => {
    parseIdentifier("invalid");
  });
  t.is(error.message, "Invalid Identifier [invalid]");
});

test("lookup :: locates handler", async (t) => {
  const handler = await lookup("@creekburn/registry-test-module@0.0.0!test-handler");
  t.is(handler(), "test-handler");
});

test("lookup :: locates handler with path", async (t) => {
  const handler = await lookup("@creekburn/registry-test-module@0.0.0!/nested/index.js/nested-module");
  t.is(handler(), "nested-module");
});

test("lookup :: locates esm handler", async (t) => {
  const handler = await lookup("@creekburn/registry-test-esm-module@0.0.0!testHandler");
  t.is(handler(), "esm-test-handler");
});

test("lookup :: locates default esm handler when not provided", async (t) => {
  const handler = await lookup("@creekburn/registry-test-esm-module@0.0.0");
  t.is(handler(), "default-esm-test-handler");
});

test("lookup :: locates esm handler with path", async (t) => {
  const handler = await lookup("@creekburn/registry-test-esm-module@0.0.0!/nested/index.mjs/testHandler");
  t.is(handler(), "esm-nested-test-handler");
});

test("lookup :: locates esm default handler with path when declared", async (t) => {
  const handler = await lookup("@creekburn/registry-test-esm-module@0.0.0!/nested/index.mjs/default");
  t.is(handler(), "default-nested-esm-test-handler");
});

test("lookup :: throws when handler is not found", async (t) => {
  await t.throwsAsync(async () => lookup("@creekburn/registry-test-esm-module@0.0.0!invalid-handler"));
});

test("lookup :: throws when import cannot find package", async (t) => {
  await t.throwsAsync(async () => lookup("not-installed-package@0.0.0!invalid-handler"));
});
