import React from "react/addons";

import API from "src/components/api";

const TestUtils = React.addons.TestUtils;

describe("components/api", function () {

  it("renders propType documentation table", function () {
    const renderer = TestUtils.createRenderer();
    const sourceFake = {
      props: {
        name: {
          name: "propName",
          required: false,
          type: {
            name: "string"
          },
          description: "Name description\n@examples \"propValue1\"",
          defaultValue: {
            computed: false,
            value: "test"
          }
        }
      }
    };
    renderer.render(<API source={sourceFake} />);

    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("table");
  });

  it("renders default message when proptypes are missing", function () {
    const renderer = TestUtils.createRenderer();
    const sourceFake = { props: null };
    renderer.render(<API source={sourceFake} />);

    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("em");
  });
});
