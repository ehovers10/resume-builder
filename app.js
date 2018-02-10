var express = require('express'),
    Page    = require('./page'),
    Data    = require("./data");

const port = 3000,
      app = express();

var config = {
      design: {
        styles:   ["resume"],
        location: "http://erikhoversten.org/cv",
        left:     ["name", "description"]
      },
      content: {
        info:     "erik",
        elements: ["education", "employment", "qualifications", "projects", "teaching"],
        sections: "sections2"
      }
};
 
var page_data = Data.getData(config.content),
    page = new Page(config.design,page_data);

app

app.use(express.static('public'))
   .get('/', (req,res) => {
     res.type('html');
     res.location(config.design.location);
     res.send(page.build());
})
   .listen(port,() => {
     console.log(`Server running on port ${port}!`);
});

