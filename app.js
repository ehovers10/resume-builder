var express = require('express'),
    Page    = require('./page'),
    Data    = require("./data");

const port = 3000,
      app = express();

var config = {
      design: {
        styles:   ["resume"],
        location: "http://erikhoversten.org/cv",
        left:     ["name"],
        description: "long",
        about:    "education",
        no_description: ["ptlMSU","bestMA","cogsciRU"],
        base_header_level: 2
      },
      content: {
        info:     "erik",
        elements: ["education", "experience", "qualifications", "projects", "teaching", "references"],
        sections: "sections-agt",
      }
};
 
var page_data = Data.getData(config.content),
    page = new Page(config.design,page_data);

app.use(express.static('public'))
   .get('/', (req,res) => {
     res.type('html');
     res.location(config.design.location);
     res.send(page.build());
})
   .listen(port,() => {
     console.log(`Server running on port ${port}!`);
});

