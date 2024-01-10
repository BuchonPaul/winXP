import G6 from "@antv/g6";
import {
  Rect,
  Group,
  Text,
  Image,
  createNodeFromReact,
} from "@antv/g6-react-node";
const insertNewlines = (inputString) => {
  let maxLength = 18;
  let outputString = "";
  let currentLineLength = 0;

  for (let i = 0; i < inputString.length; i++) {
    const currentChar = inputString[i];

    if (currentChar === " ") {
      var lastSpaceIndex = i;
    }

    outputString += currentChar;
    currentLineLength++;

    if (
      currentLineLength === maxLength &&
      typeof lastSpaceIndex !== "undefined"
    ) {
      outputString =
        outputString.substring(0, lastSpaceIndex + 1) +
        "\n" +
        outputString.substring(lastSpaceIndex + 1);
      currentLineLength = i - lastSpaceIndex;
      lastSpaceIndex = undefined;
    }
  }

  return outputString;
};

const WinNode = ({ cfg = {} }) => {
  const { title, selected = false, icon } = cfg;
  return (
    <Group>
      <Rect
        className="icon"
        style={{
          width: 150,
          height: 150,
          fill: selected ? "rgba(133,255,255,0.4)" : "transparent",
          stroke: selected ? "#bde6ff" : "transparent",
          display: "flex",
          alignItems: "center",
        }}
        draggable
      >
        <Image
          style={{
            img: icon,
            width: 80,
            height: 80,
          }}
          draggable
        />
        <Text
          style={{
            padding: "18px 0px 0px 0px",
            fill: "#F1F1F1",
            letterSpacing: "1px",
            stroke: "false",
            fontSize: 15,
          }}
          draggable
        >
          {insertNewlines(title)}
        </Text>
      </Rect>
    </Group>
  );
};
G6.registerNode("win-node", createNodeFromReact(WinNode));
