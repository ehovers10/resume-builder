function listWrap(items,innerWrap,kind) {
  var thing = '<ul class="' + kind + '">';
  for (var item in items) {
    thing += "<li>" + innerWrap(items[item]) + "</li>";
  }
  thing += "</ul>";

  return thing;
}

function subList(item) {
  return typeCheck(item);
}

function typeCheck(item) {
  return typeof item === "object" ? linkWrap(item) : item;
}

function linkWrap(item) {
  return '<a class="link" href="' + item["link"] + '">' + item["title"] + '</a>';
}

module.exports.listWrap = listWrap;
module.exports.subList = subList;
module.exports.typeCheck = typeCheck;
module.exports.linkWrap = linkWrap;
