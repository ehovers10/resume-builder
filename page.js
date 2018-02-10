var templates = require("./templates");
var common = require("./common");

function Page(design,content) {
  this.styles      = design.styles;
  this.left        = design.left;
  this.top         = content.top;
  this.sections    = content.sections;
  this.elements    = content.elements;
  this.name        = content.top.name;
  this.description = content.top.description;
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
             `<title>${this.name} | ${this.description}</title>`;
  for (style in this.styles) {
    body += `<link rel="stylesheet" type="text/css" href="/${this.styles[style]}.css">`;
  }
  body += "</head>";

  return body;
};

Page.prototype.buildHeader = function buildHeader(lefts,count) {
  
  var part_rank = (count !== 0) ? " addl" : "",
      body = '<div class="top' + part_rank + '"><div class="info">',
      left = '<div class="left">',
      right = '<div class="right">';

  for (item in this.top) {
    if (item != "description") {
      if (lefts.includes(item)) {
        left += `<div class="${item}">${common.typeCheck(this.top[item])}</div>`;
      } else {
        right += `<div class="${item}">${common.typeCheck(this.top[item])}</div>`;
      }
    }
  }
    
  body += left + '</div>' + right + '</div></div>';

  return body + '<div class="description' + part_rank + '">' + this.top["description"] + '</div></div>';
};

Page.prototype.buildMain = function buildMain() {
  var body = '';
  for ( var i=0, max=this.sections.length; i < max; i += 1 ) {
    body += `<div class="part${(this.sections[i]['title']) ? this.sections[i]['title'] : ''}">`;
    body += this.buildHeader(this.left,i);
    if (this.sections[i]['title']) { 
      body += `<h1 class="title">${this.sections[i]["title"]}</h1>`;
    }
    body +=   '<div class="body">' + 
                this.buildSection(this.sections[i]) +
              '</div>' +
            '</div>';
  }

  return body;
};

Page.prototype.buildSection = function buildSection(section) {
  var bits = Object.keys(this.elements),
      body = "";
  for (var i = 0, max = bits.length; i < max; i += 1) {
    if (section[bits[i]]) {
      //console.log(this.elements[bits[i]]);
      var el_stuff = {
        type: bits[i], 
        things: section[bits[i]],
        store: this.elements[bits[i]],
      };
      body += `<div class="section ${el_stuff.type}">` +
                `<h2 class="title">${el_stuff.type}</h2>` +
                '<div class="body">' + 
                  this.buildElement(el_stuff) +
                '</div>' +
              "</div>";
    }
  }

  return body;
};

Page.prototype.buildElement = function buildElement(stuff) {
  var body = "";
  for (var k = 0, kmax = stuff.things.length; k < kmax; k += 1) {
    var bit = stuff.things[k];
    if (bit.type) {
      //console.log(bit);
      body += `<h3 class="title">${bit.type}</h3>`;
      for (var j = 0, jmax = bit.elements.length; j < jmax; j += 1) {
        body += this.runTemplate(bit.elements[j], stuff);
      }
    } else {
      body += this.runTemplate(bit, stuff);
    }
  }

  return body;
};

Page.prototype.runTemplate = function runTemplate(bit, stuff) {
  if (stuff.store[bit]) {
    return '<div class="element">' + templates.template(stuff.store[bit],stuff.type) + '</div>';
  } else { console.log(bit, " not found!") }
};


module.exports = Page;
