"use strict";

const React = require("react");
const { DOM: dom } = React;
const SourceTree = React.createFactory(require("../SourceTree"));
const { storiesOf } = require("@kadira/storybook");

const EXAMPLE_SOURCE = {};
const sources = ["root", [
  ["mozilla.com", [
    ["script.js", EXAMPLE_SOURCE],
    ["folder", [
      ["foo.js", EXAMPLE_SOURCE],
      ["bar.js", EXAMPLE_SOURCE],
    ]],
    ["some", [
      ["long", [
        ["path.js", EXAMPLE_SOURCE]
      ]]
    ]]
  ]]
]];

storiesOf("SourceTree", module)
  .add("Source Tree", () => {
    return renderContainer(
      dom.div(
        { className: 'theme-light'},
        SourceTree({ sources })
      )
    );
  });

function renderContainer(child) {
  return dom.div({ style: {
    width: "300px",
    margin: "auto",
    paddingTop: "100px"
  }}, child);
}
