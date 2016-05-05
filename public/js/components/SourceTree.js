const React = require("react");
const { DOM: dom, PropTypes } = React;
const TreeView = React.createFactory(require("./tree/tree-view"));

/**
 * Test to see if it's a collection of children, or the actual
 * source definition.
 */
function isChildren(children) {
  return Array.isArray(children) && children.length > 0;
}

/**
 * Collapse long path names
 */
function getCollapsedPath(source) {
  const [key, children] = source;
  if(isChildren(children) && children.length === 1) {
    let [nextKey, nextChildren] = children[0];

    return getCollapsedPath([
      `${key}/${nextKey}`, nextChildren
    ]);
  }
  return source
}

const SourceTree = React.createClass({

  displayName: "SourceTree",

  render: function () {
    let columns = [];

    const { sources } = this.props;

    return (
      TreeView({
        object: sources,
        provider: {
          getChildren: ([key, children]) => {
            return children.map(getCollapsedPath)
          },
          hasChildren: ([key, children]) => isChildren(children),
          getLabel: ([key]) => key,
          getValue: ([key]) => key,
          getKey: ([key]) => key,
          getType: () => "type",
        },
        // decorator: new DomDecorator(),
        mode: "short",
        columns: columns,
        renderValue: () => "",
        // onFilter: this.onFilter
      })
    );
  }
});

module.exports = SourceTree;
