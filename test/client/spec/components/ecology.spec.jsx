/**
 * Client tests
 */
import React from "react";
import TestUtils from "react-addons-test-utils";
import Ecology from "src/components/ecology";
// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html

describe("components/ecology", function () {

  it("has expected content with shallow render", function () {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(<Ecology />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal("div");
  });
});
