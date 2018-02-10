var common = require("./common");

function template(object,type) {
  switch (type) {

  case "projects":
    var output = `<a class="start" href="${object.output}">${object.title}</a>` +
                 `, ${object.organization}` +
                 ` (${object.date})<br>` +
                 `<div class="details">${object.description}</br>`;
    if (object.tools) {
      output += `<span class="listhead">Tools: </span>${common.listWrap(object.tools,common.subList,"sub")}`;
    }
    return output + '</div>';
    break;

  case "education":
    return `<span class="start">${object.degree} in ${object.department}</span>` +
           `, ${object.school} (${object.date})`;    
    break;

  case "employment":
    var item = `<span class="start">${object.title}</span>` +
               `, ${object.organization}` +
               ` (${object.tenure.start} &mdash; ${object.tenure.end})<br>`;
    if (object.responsibilities) {
      item += `<div class="details"><span class="listhead"></span>${common.listWrap(object.responsibilities,common.subList,"sub")}</div>`;
    }
    return item;
    break;

  case "teaching":
    return `<span class="start">${object.title}</span>` +
           `, ${object.school}` +
           ` (${object.term}) ` +
           `<span class="listhead"></span>[${common.listWrap(object.resources,common.subList,"sub")}]`;
    break;
  
  case "qualifications":
    return `<span class="start">${object.title}</span>` +
           `, ${object.organization}` +
           ` (${object.date})<br>` +
           `<div class="details">${object.details}</div>`;
    break;
  default: console.log(type, " not found!");
  }
}

module.exports.template = template;
