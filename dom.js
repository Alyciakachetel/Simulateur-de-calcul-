// Fonction pour créer une ligne dans le tableau
export function creerLigneTableau(index, capitalAmorti, interet, capitalRestantDu, remboursementMensuel) {
    const tr = document.createElement('tr');
    if (Math.round(capitalAmorti) < Math.round(interet)) {
      tr.classList.add('warning');
    }
  
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${Math.round(capitalAmorti).toLocaleString()}</td>
      <td>${Math.round(interet).toLocaleString()}</td>
      <td>${Math.round(capitalRestantDu).toLocaleString()}</td>
      <td>${Math.round(remboursementMensuel).toLocaleString()}</td>
    `;
    return tr;
  }
  
  // Fonction pour remplir le tableau dans le DOM
  export function remplirTableau(amortissement) {
    const tableau = document.getElementById("inputMensualite");
    tableau.innerHTML = ''; // Efface le contenu précédent
  
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Période</th>
        <th>Capital Amorti</th>
        <th>Intérêts</th>
        <th>Capital Restant Dû</th>
        <th>Mensualité</th>
      </tr>
    `;
    tableau.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    amortissement.forEach(({ remboursementMensuel, capitalAmorti, interet, capitalRestantDu }, index) => {
      tbody.appendChild(creerLigneTableau(index, capitalAmorti, interet, capitalRestantDu, remboursementMensuel));
    });
    tableau.appendChild(tbody);
  }
  