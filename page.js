var templates = require("./templates");
var common = require("./common");

function Page(design,content) {
  this.styles      = design.styles;
  this.left        = design.left;
  this.descrip     = design.description;
  this.no_descrip  = design.no_description;
  this.top         = content.top;
  this.pages       = content.sections;
  this.elements    = content.elements;
  this.name        = content.top.name;
  this.description = content.top.description;
  this.base_level  = design.base_header_level;
  this.about       = content.about[design.about];
}

Page.prototype.build = function build() {
  var page = this.buildHead() +
             '<body><div class="page">' +
             //this.buildHeader(left) + 
             this.buildMain() +
             '</div></body>';
  return page;
};

Page.prototype.buildHead = function buildHead() {
  var body = "<head>" +
             `<title>${this.name}</title>`;
  for (style in this.styles) {
    body += `<link rel="stylesheet" type="text/css" href="/${this.styles[style]}.css">`;
  }
  body += "</head>";

  return body;
};

Page.prototype.buildHeader = function buildHeader(lefts,count,about) {
  
  var part_rank = (count !== 0) ? " addl" : "",
      body = '<div class="top' + part_rank + '"><div class="info">',
      left = '<div class="left">',
      right = '<div class="right">';

  for (item in this.top) {
    if (lefts.includes(item)) {
      left += `<div class="${item}">${common.typeCheck(this.top[item])}</div>`;
    } else {
      right += `<div class="${item}">${common.typeCheck(this.top[item])}</div>`;
    }
  }
    
  body += left + '</div>' + right + '</div></div>';
  
  return body + '<div class="description' + part_rank + '">' + this.about + '</div></div>';
};

Page.prototype.buildMain = function buildMain() {
  var body = '';
  for ( var i = 0, imax = this.pages.length; i < imax; i += 1 ) {
    body += '<div class="part">';
    body += this.buildHeader(this.left,i,this.about);
    body +=   '<div class="body">';
    for (var j = 0, jmax = this.pages[i]['page'].length; j < jmax; j += 1 ) {
      var type = this.pages[i]['page'][j]['group'] || this.pages[i]['page'][j]['area'] || '';
      body += `<div class="section ${type}">` +
                this.buildSection(this.pages[i]['page'][j],this.base_level) +
              '</div>';
    }
    body += '</div>' +
            '</div>';
  }

  return body;
};

Page.prototype.buildSection = function buildSection(section,level) {
  //console.log(section);
  var body = "";
  if (section instanceof Array) {
    for (var i = 0, imax = section.length; i < imax; i += 1) {
      body += this.buildSection(section[i],level + 1);
    }
  } else if (section.group) {
    body += `<h${level.toString()}>${section.group}</h${level.toString()}>`;
    body += this.buildSection(section.content,level + 1);
  } else {
    if (section.area) { 
      body += `<h${level.toString()}>${section.area}</h${level.toString()}>`;
      
    } 
    //console.log(section.area);
    body += `<div class="body">` + 
              this.buildElement(section.items) +
            '</div>';
  }
  return body;
};

Page.prototype.buildElement = function buildElement(content) {
  var body = "";
  //console.log(content);
  for (var j = 0, jmax = content.length; j < jmax; j += 1) {
    body += this.runTemplate(content[j].type,content[j].id);
    if (content[j].sub) {
      body += '<div class="sub">';
      for (var i = 0, imax = content[j].sub.length; i < imax; i += 1) {
        if (content[j].sub[i].area) { 
          body += '<h4>' + content[j].sub[i].area + '</h4>';
        }
        body += this.buildElement(content[j].sub[i].items);
      }
      body += "</div>";
    } 
  }

  return body;
};

Page.prototype.runTemplate = function runTemplate(type,id) {
  var write_descrip = "on";
  if (this.elements[type][id]) {
    if (this.no_descrip.includes(id)) {
      write_descrip = "off";
    } 
    return '<div class="element">' + templates.template(type,this.elements[type][id],this.descrip,write_descrip) + '</div>';
  } else { console.log(id, "not found!") }
};


module.exports = Page;
