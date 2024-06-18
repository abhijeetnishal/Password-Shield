import fs from "fs";

// Function to read the HTML template
function getHtmlTemplate(filePath: string, replacements: any) {
  let html = fs.readFileSync(filePath, "utf8");

  for (const key in replacements) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), replacements[key]);
  }

  return html;
}

export { getHtmlTemplate };
