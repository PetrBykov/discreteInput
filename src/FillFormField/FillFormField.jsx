import React from "react";

export const fieldState = React.createContext({});

// Поле ввода. Состоит из клеток с символами
export class FillFormField extends React.Component {
  render() {
    return (
      <FillFormErrorControl>
        <FillFormFieldComponent {...this.props}>
          {this.props.children}
        </FillFormFieldComponent>
      </FillFormErrorControl>
    );
  }
}

class FillFormErrorControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <h1>{this.state.error.toString()}</h1>;
    }

    return this.props.children;
  }
}

// Поле ввода. Состоит из клеток с символами
class FillFormFieldComponent extends React.Component {
  // Данная функция принимает массив объектов с описанием ячеек с собсвенными индексами (selfIndex)
  // и сортирует их поля "порядковый номер" (orderIndex)
  // функция сортируется НЕ объекты, а только поля "порядковый номер"
  // таким образом мы получаем реальную информацию о том, какие ячейки с собственными индексами должны выводить какие символы строки (stringValue)

  quickSortOrderIndexes(arr) {
    function quickSortOrderIndexesImplementation(arr, l, r) {
      let q = partition(arr, l, r);
      if (l < q - 1) quickSortOrderIndexesImplementation(arr, l, q - 1);
      if (r > q) quickSortOrderIndexesImplementation(arr, q, r);
    }

    function partition(arr, l, r) {
      let i = l;
      let j = r;

      // В качестве опорного элемента берем средний
      const mid = arr[Math.ceil(l + (j - l) / 2)].orderIndex;

      while (i < j && arr[i].orderIndex < mid) {
        i++;
      }
      while (i < j && arr[j].orderIndex > mid) {
        j--;
      }
      while (i < j) {
        [arr[i].orderIndex, arr[j].orderIndex] = [
          arr[j].orderIndex,
          arr[i].orderIndex,
        ];

        i++;
        j--;
        while (i < j && arr[i].orderIndex < mid) {
          i++;
        }
        while (i < j && arr[j].orderIndex > mid) {
          j--;
        }
      }
      return i;
    }

    // Начало выполнения...
    if (arr.length !== 0)
      quickSortOrderIndexesImplementation(arr, 0, arr.length - 1);
  }

  // Загеристрировать ячейку с символом
  // Функция работает с массивом всех ячеек с символами
  // и массивом всех ячеек с персональными индексами
  // если ячейка НЕ имеет персональный индекс, в массив просто заносится ее порядковый номер.
  // если ячейка имеет персональный индекс, то создается объект, где присутствует персональный индекс, порядковый номер (он в дальнейшем будет меняться при сортировке), и его номер в DOM
  // и он кладется в массив всех ячеек с персональными индексами, чтобы по этому массиву можно было проводить сортировку
  // при этом в массив с ячейками просто кладется undefined, чтобы зарезирвировать место под эту ячейку с персональным индеком, чтобы туда потом положить вычесленный порядковый номер
  registerCharacterCell(customIndex) {
    let newIndex = this.charactersCellsIndexes.length;
    let hasCustomIndex = customIndex !== undefined;
    let characterCellInfo;
    if (hasCustomIndex) {
      characterCellInfo = {
        customIndex: customIndex,
        orderIndex: newIndex,
        DOMIndex: newIndex,
      };
      this.characterCellsWithCustomIndex.push(characterCellInfo);
      this.charactersCellsIndexes.push(undefined);
    } else {
      this.charactersCellsIndexes.push(newIndex);
    }

    this.setState({});
  }

  // Вычислить индекс символа в строке, за который отвечает конктретный контейнер с символом.
  // Какой контейнер с символом обращатся за своим индексом, определяется по порядку вызовов функции
  getCharacter() {
    if (this.nextSharingCharacterIndex >= this.charactersCellsIndexes.length)
      return undefined;
    let orderIndex =
      this.charactersCellsIndexes[this.nextSharingCharacterIndex];
    this.nextSharingCharacterIndex++;
    let character =
      this.state.value.length > orderIndex
        ? this.state.value[orderIndex]
        : undefined;
    return character !== undefined ? character : "";
  }
  constructor(props) {
    super(props);
    let replaceEmptyCharsWithSpaces = false;
    if (props.replaceEmptyCharsWithSpaces) {
      replaceEmptyCharsWithSpaces = true;
    }
    this.state = {
      currentState: "Init",
      value: "",
      replaceEmptyCharsWithSpaces,
    };
    this.textInput = React.createRef();
    this.mapCharacterIndexToStringIndex = [];
    this.charactersCellsIndexes = [];
    this.characterCellsWithCustomIndex = [];
    this.nextSharingCharacterIndex = null;
  }
  componentDidMount() {
    console.log("Mounted " + this.state.currentState);
    // Отсортировать массив с ячейками символов с персональными индексами по персональному индексу по возрастанию
    this.characterCellsWithCustomIndex.sort(function (a, b) {
      return a.customIndex - b.customIndex;
    });
    // далее у этих ячеек поменять порядковый индекс в соотвествии с персональным индексом
    this.quickSortOrderIndexes(this.characterCellsWithCustomIndex);
    let FillFormField = this;
    this.characterCellsWithCustomIndex.forEach(function (value) {
      FillFormField.charactersCellsIndexes[value.DOMIndex] = value.orderIndex;
    });
    this.nextSharingCharacterIndex = 0;
  }
  componentDidUpdate() {
    this.nextSharingCharacterIndex = 0;
  }
  // При клике на поле ввода, необходимо поставить фокус на невидимое фиктивное поле ввода, чтобы пользователь вводил строку.
  onClick(e) {
    this.textInput.current.focus();
  }
  // При вводе в невидимом фиктивном поле ввода, нужно пробрасывать строку из нее в наше поле ввода
  onInput(e) {
    // Принимает новое строковое значение поля, которое было введено пользователем.
    // Если все в порядке, то возвращает true

    // Если строка, которая должна быть в поле ввода, по количеству символов превышает количество клеток с символами, то отклонить строку
    if (e.currentTarget.value.length > this.charactersCellsIndexes.length) {
      let strToArray = e.currentTarget.value.split("");
      strToArray.pop();
      let prevString = strToArray.join("");
      e.currentTarget.value = prevString;
    } else {
      let value = e.currentTarget.value;
      // Если успешно, то принять новую строку, и указать на новый индекс клетки для ввода символа.
      this.setState({ value });
    }
  }
  render() {
    let currentState = this.state.currentState;
    let getCharacter = this.getCharacter.bind(this);
    let registerCharacterCell = this.registerCharacterCell.bind(this);
    let replaceEmptyCharsWithSpaces = this.state.replaceEmptyCharsWithSpaces;
    console.log("Render FillFormField");
    return (
      <div onClick={this.onClick.bind(this)}>
        <fieldState.Provider
          value={{
            currentState,
            registerCharacterCell,
            getCharacter,
            replaceEmptyCharsWithSpaces,
          }}
        >
          {this.props.children}
        </fieldState.Provider>
        <input
          style={{
            opacity: "0",
            width: 0,
            height: 0,
            cursor: "default",
            border: "none",
            position: "absolute",
            left: 0,
          }}
          tabIndex={this.props.tabIndex ? this.props.tabIndex : 0}
          ref={this.textInput}
          onInput={this.onInput.bind(this)}
        ></input>
      </div>
    );
  }
}
