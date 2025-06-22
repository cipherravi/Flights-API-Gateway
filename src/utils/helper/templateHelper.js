const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

function compileTemplate(templateName, templateData) {
  const filePath = path.join(
    __dirname,
    "../../templates",
    `${templateName}.hbs`
  );
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);

  if (templateData === "string") {
    templateData = JSON.parse(templateData);
  }
  return template(templateData);
}

module.exports = compileTemplate;
