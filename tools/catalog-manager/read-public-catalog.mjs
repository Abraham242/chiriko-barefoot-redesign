/** Read JSON array literals only. Never execute TypeScript or follow private inputs. */
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import ts from "typescript";

export function extractProductArray(source, name) {
  const file = ts.createSourceFile("catalog.ts", source, ts.ScriptTarget.Latest, true);
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name) {
        if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
          throw new Error(`Expected a public array literal for ${name}`);
        }
        const products = JSON.parse(declaration.initializer.getText(file));
        if (!Array.isArray(products)) throw new Error(`Invalid public array: ${name}`);
        return products;
      }
    }
  }
  return null;
}

export async function readPublicCatalog(catalogPath) {
  const source = await readFile(catalogPath, "utf8");
  const core = extractProductArray(source, "coreProducts");
  if (core === null) {
    const legacy = extractProductArray(source, "products");
    if (legacy === null) throw new Error("No public catalog array found");
    return legacy;
  }
  const groundies = extractProductArray(await readFile(resolve(dirname(catalogPath), "groundiesProducts.ts"), "utf8"), "groundiesProducts");
  if (groundies === null) throw new Error("No public Groundies array found");
  const products = [...core, ...groundies];
  for (const key of ["id", "slug"]) {
    if (new Set(products.map((product) => product[key])).size !== products.length) {
      throw new Error(`Duplicate public product ${key}`);
    }
  }
  return products;
}
