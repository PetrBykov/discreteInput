import React from "react";
import { fieldState } from "../FillFormField";

export class FillFormCharacter extends React.Component {
  componentDidMount() {
    this.context.registerCharacterCell(this.props.characterIndex);
  }
  render() {
    return (
      <fieldState.Consumer>
        {(field) => {
          console.log("Render FillFormCharacter ");
          let character = field.getCharacter();
          let replaceEmptyCharsWithSpaces = field.replaceEmptyCharsWithSpaces;
          if (character === "" && replaceEmptyCharsWithSpaces) {
            return <>&emsp;</>;
          } else {
            return character;
          }
        }}
      </fieldState.Consumer>
    );
  }
}

FillFormCharacter.contextType = fieldState;
