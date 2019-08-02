module.exports = function(plop) {
  plop.setGenerator("StatelessComponent", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/{{name}}/index.tsx",
        templateFile: ".templates/StatelessComponent/index.hbs"
      },
      {
        type: "add",
        path: "src/{{name}}/story.tsx",
        templateFile: ".templates/StatelessComponent/story.hbs"
      }
    ]
  });

  plop.setGenerator("StatefulComponent", {
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name"
      }
    ],
    actions: [
      {
        type: "add",
        path: "src/{{name}}/index.tsx",
        templateFile: ".templates/StatefulComponent/index.hbs"
      },
      {
        type: "add",
        path: "src/{{name}}/story.tsx",
        templateFile: ".templates/StatefulComponent/story.hbs"
      }
    ]
  });
};
