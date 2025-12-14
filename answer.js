function displayDiseases() {
  const diseasesList = document.getElementById('diseases-list');
  diseasesList.innerHTML = '';

  const headerLi = document.createElement('li');
  headerLi.innerHTML = `<h3 style="margin: 5px 0 10px 0; font-size: 1.1em;">DOENÇAS</h3>`;
  diseasesList.appendChild(headerLi);

  diseases.forEach((disease, index) => {
    const listItem = document.createElement('li');
    const span = document.createElement('span');
    const name = disease.name || disease.nome || '';
    span.textContent = `[ID ${index}] - ${name}`;
    span.className = '';
    if (disease.estado === 1) span.classList.add('riscado');
    if (disease.estado === 2) span.classList.add('marcatexto');
    if (disease.estado === 3) span.classList.add('confirmacao');

    span.addEventListener('click', () => {
      // ciclo: 0 -> 1 (riscado) -> 2 (marcatexto) -> 3 (confirmacao, exclusiva) -> 0
      if (!disease.estado || disease.estado === 0) {
        disease.estado = 1;
      } else if (disease.estado === 1) {
        disease.estado = 2;
      } else if (disease.estado === 2) {
        // tornar confirmacao exclusivo entre diseases
        diseases.forEach(other => {
          if (other !== disease && other.estado === 3) other.estado = 2;
        });
        disease.estado = 3;
      } else {
        disease.estado = 0;
      }
      renderAnswer();
    });

    listItem.appendChild(span);
    diseasesList.appendChild(listItem);
  });
}

function displayLocations() {
  const locationsList = document.getElementById('locations-list');
  locationsList.innerHTML = '';

  const headerLi = document.createElement('li');
  headerLi.innerHTML = `<h3 style="margin: 5px 0 10px 0; font-size: 1.1em;">LOCALIZAÇÕES</h3>`;
  locationsList.appendChild(headerLi);

  locations.forEach((location, index) => {
    const listItem = document.createElement('li');
    const span = document.createElement('span');
    const name = (location && (location.name || location.nome)) ? (location.name || location.nome) : String(location);
    span.textContent = `[ID ${index}] - ${name}`;
    span.className = '';
    if (location && location.estado === 1) span.classList.add('riscado');
    if (location && location.estado === 2) span.classList.add('marcatexto');
    if (location && location.estado === 3) span.classList.add('confirmacao');

    span.addEventListener('click', () => {
      if (!location.estado || location.estado === 0) {
        location.estado = 1;
      } else if (location.estado === 1) {
        location.estado = 2;
      } else if (location.estado === 2) {
        // tornar confirmacao exclusiva entre locations
        locations.forEach(other => {
          if (other !== location && other.estado === 3) other.estado = 2;
        });
        location.estado = 3;
      } else {
        location.estado = 0;
      }
      renderAnswer();
    });

    listItem.appendChild(span);
    locationsList.appendChild(listItem);
  });
}

function toggleAnswer() {
  const answerMenu = document.querySelector(".answer-menu");
  if (answerMenu.classList.contains("hide")) {
    answerMenu.classList.remove("hide");
    // render unified interactive lists
    renderAnswer();
  } else {
    answerMenu.classList.add("hide");
  }
}

document.getElementById('closeAnswer').addEventListener('click', () => {
  const answerMenu = document.querySelector(".answer-menu");
  answerMenu.classList.add('hide'); 
});


function renderAnswer() {
  const diseasesList = document.getElementById('diseases-list'); 
  const locationsList = document.getElementById('locations-list');

  diseasesList.innerHTML = '';
  locationsList.innerHTML = '';

  // add headers so titles don't disappear after rerender
  const headerDiseases = document.createElement('li');
  headerDiseases.innerHTML = `<h3 style="margin: 5px 0 10px 0; font-size: 1.1em;">DOENÇAS</h3>`;
  diseasesList.appendChild(headerDiseases);

  const headerLocations = document.createElement('li');
  headerLocations.innerHTML = `<h3 style="margin: 5px 0 10px 0; font-size: 1.1em;">LOCALIZAÇÕES</h3>`;
  locationsList.appendChild(headerLocations);

  diseases.forEach((d, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const name = d.name || d.nome || String(d);
    span.textContent = `[ID ${index}] - ${name}`;

    span.className = "";
    if (d.estado === 1) span.classList.add('riscado');
    if (d.estado === 2) span.classList.add('marcatexto');
    if (d.estado === 3) span.classList.add('confirmacao');

    span.addEventListener('click', () => {
      // cycle: 0 -> 1 (riscado) -> 2 (marcatexto) -> 3 (confirmacao, exclusive) -> 0
      if (!d.estado || d.estado === 0) {
        d.estado = 1;
      } else if (d.estado === 1) {
        d.estado = 2;
      } else if (d.estado === 2) {
        // set this to confirmacao and ensure only one disease is in confirmacao
        diseases.forEach(other => {
          if (other !== d && other.estado === 3) other.estado = 2;
        });
        d.estado = 3;
      } else {
        d.estado = 0;
      }
      renderAnswer();
    });

    li.appendChild(span);
    diseasesList.appendChild(li);
  });


  // normalize locations so primitives become objects with persistent `estado`
  locations.forEach((location, idx) => {
    if (typeof location !== 'object' || location === null) {
      locations[idx] = { name: String(location), estado: 0 };
    }
  });

  locations.forEach((location, idx) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const name = location.name || location.nome || String(location);
    span.textContent = `[ID ${idx}] - ${name}`;

    span.className = '';
    if (location.estado === 1) span.classList.add('riscado');
    if (location.estado === 2) span.classList.add('marcatexto');
    if (location.estado === 3) span.classList.add('confirmacao');
    // attach per-item click handler (mirrors diseases behavior)
    span.addEventListener('click', () => {
      console.log('[DEBUG] location click', idx, location && (location.name || location.nome));
      console.log('[DEBUG] estado before', location && location.estado);
      if (!location.estado || location.estado === 0) {
        location.estado = 1;
      } else if (location.estado === 1) {
        location.estado = 2;
      } else if (location.estado === 2) {
        locations.forEach(other => {
          if (other !== location && other.estado === 3) other.estado = 2;
        });
        location.estado = 3;
      } else {
        location.estado = 0;
      }
      console.log('[DEBUG] estado after', location.estado);
      renderAnswer();
    });

    li.appendChild(span);
    locationsList.appendChild(li);
  });
}
