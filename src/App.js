import { FillFormCharacter } from "./FillFormField/FillFormCharacter/FillFormCharacter"
import { FillFormField } from "./FillFormField/FillFormField"
import s from "./App.css";
function App() {
  return (
    <>
      <FillFormField tabIndex={1} replaceEmptyCharsWithSpaces={true} style={{border: "1px solid black"}} focusedStyle={{color: "red"}}>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={1} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={6} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={2} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={7} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={3} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={8} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={4} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={9} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={5} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={10} /></span>
      </FillFormField>
      <FillFormField tabIndex={2} replaceEmptyCharsWithSpaces={true}>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={1} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={6} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={2} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={7} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={3} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={8} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={4} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={9} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={5} /></span>
        <span inputsymbol={"true"} style={s.span} ><FillFormCharacter characterIndex={10} /></span>
      </FillFormField>
    </>
  );
}

export default App;
