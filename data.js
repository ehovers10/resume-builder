var yaml   = require('js-yaml');
var fs     = require('fs');

exports.getData = function getData(config) {
  var directory = 'data',
      elems = {},
      top_file = directory + '/' + config.info + '.yml',
      sects_file = directory + '/' + config.sections + '.yml';

  try {
    var top   = yaml.safeLoad(fs.readFileSync(top_file, 'utf8')),
        sects = yaml.safeLoad(fs.readFileSync(sects_file, 'utf8'));

    for (elem in config.elements) {
      var source = directory + '/' + config.elements[elem] + '.yml';
      elems[config.elements[elem]] = yaml.safeLoad(fs.readFileSync(source, 'utf8'));
    }
  } catch (e) {
    console.log(e);
  }

  return {"top":top,"sections":sects,"elements":elems};
}
