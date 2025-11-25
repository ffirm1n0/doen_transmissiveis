const cases = [];
// { pathHistory: [], sypmtons: [], name: "", isSelected: false, color: "" }

function renderCases() {
  const test = document.querySelector("#test");
  test.innerHTML = "";

  for (caseIndex in cases) {
    const { isSelected } = cases[caseIndex];
    test.innerHTML += `
        <div>
            <h1>Caso nº ${Number(caseIndex) + 1}</h1>
            <input type="checkbox" checked={${isSelected == true}} />
        </div>
    `;
  }
}
