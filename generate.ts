import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";
import ts, {isInterfaceDeclaration, isTypeAliasDeclaration, tokenToString} from "typescript";


const ast = await openapiTS(new URL("./src/api.yaml", import.meta.url));

// console.log(ast)

const contents = astToString(ast);

const interfaces = ast.filter(isInterfaceDeclaration)

const components = interfaces.find((node) => node.name.text === "components")

console.log(components)

const schemas = components!.members.filter(isTypeAliasDeclaration).find(node => node.name.text === "schemas")

console.log(schemas)

