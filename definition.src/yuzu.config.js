const yuzuHelpers = require('yuzu-definition-hbs-helpers');

yuzuHelpers.slug = function(input) {
    input = input.toLowerCase();
    input = input.replace(/\s/g, "-");
    return input;
};

module.exports = {
    blockDependenciesTimeout: 1000,
    hbsHelpers: yuzuHelpers,
    renderedPartialDirs: ['./_dev/_templates/blocks/', './_dev/_templates/_dataStructures/'],
    layoutDir: './_dev/_templates/_layouts/',
    registeredPartialsDirs: ['./_dev/_templates/blocks/'],
    dependantDirectories: ['./_dev/_templates/_layouts/', './_dev/_templates/blocks/'],
    autoSchemaProperties : [
        {
            name: '_ref',
            schema: {
            "type": "string"
            }
        },
        {
            name: '_modifiers',
            schema: {
            "type": "string"
            }
        },
        {
            name: 'yuzu-path',
            schema: {
                "type": "string"
            }
        }
    ]
};