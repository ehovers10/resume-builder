var common = require("./common");

function template(type,object,description,write_des) {
  switch (type) {

  case "projects":
    var output = `<a class="start" href="${object.output}">${object.title}</a>` +
                 `, ${object.organization}` +
                 ` (${object.date})<br>` +
                 `<div class="details">${object.description}</br>`;
    if (object.tools) {
      output += `<span class="listhead">Tools: </span>${common.listWrap(object.tools,common.subList,"short")}`;
    }
    return output + '</div>';
    break;

  case "education":
    var notes = "";
    if (object.awards) {
     notes += common.listWrap(object.awards,common.subList,"short") + ", ";
    }
    return `<span class="start">${object.degree} in ${object.department}</span>` +
           `, ${notes}${object.school} (${object.date})`;    
    break;

  case "experience":
    var item = `<span class="start">${object.title}</span>` +
               `, ${object.organization}` +
               ` (${object.tenure.start} &mdash; ${object.tenure.end})<br>`;
    if (object.responsibilities && write_des == "on") {
      item += `<div class="details"><span class="listhead"></span>${common.listWrap(object.responsibilities[description],common.subList,description)}</div>`;
    }
    return item;
    break;

  case "teaching":
    return `<span class="start">${object.title}</span>` +
           `, ${object.school}` +
           ` (${object.term}) ` +
           `<span class="listhead"></span>[${common.listWrap(object.resources,common.subList,"short")}]`;
    break;
  
  case "qualifications":
    var item = `<span class="start">${object.title}</span>` +
               `, ${object.organization}` +
               ` (${object.date})<br>`;
    /*if (object.details && write_des == "on") {
      item += `<div class="details"><span class="listhead"></span><ul class="long"><li>${object.details}</li></ul></div>`;
    }*/
    return item;
    break;

  case "references":
    return `<span class="start">${object.name}</span><br>` +
           `${object.title}<br>${object.organization}<br>` +
           `<a href="mailto:${object.email}">${object.email}</a><br>${object.phone}`;
    break;

  default: console.log(type, " not found!");
  }
}

module.exports.template = template;
