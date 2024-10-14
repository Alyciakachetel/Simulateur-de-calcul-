// l'importation
import { remplirTableau } from './dom.js'; // Importer la fonction de remplissage du tableau 

function getValues() {
    const {
      inputMontant,
      inputTaux,
      inputAnnee
    } = window;
    let montant = Math.abs(inputMontant.valueAsNumber) || 0,
      annee = Math.abs(inputAnnee.valueAsNumber) || 0,
      mois = annee * 12 || 1,
      taux = Math.abs(inputTaux.valueAsNumber) || 0,
      tauxMensuel = taux / 100 / 12;

      if (!validerEntrees(montant, taux, annee)) return null;
    return {
      montant,
      annee,
      mois,
      taux,
      tauxMensuel
    }
  }

  // validation des entrées
  function validerEntrees(montant, taux, annee) {
    if (montant <= 0) {
      alert("Le montant doit être supérieur à zéro.");
      return false;
    }
    if (taux < 0 || taux > 100) {
      alert("Le taux doit être entre 0 et 100.");
      return false;
    }
    if (annee <= 0) {
      alert("L'année doit être supérieure à zéro.");
      return false;
    }
    return true;
  }
  
  let calculMensualite = function(montant, tauxMensuel, mois) {
    let remboursementMensuel;
    if (tauxMensuel) {
      remboursementMensuel = montant * tauxMensuel /
        (1 - (Math.pow(1 / (1 + tauxMensuel), mois)));
    } else {
      remboursementMensuel = montant / mois;
    }
  
    return remboursementMensuel;
  
  }
  
  let calculAmortissement = (montant, tauxMensuel, mois, annee) => {
      let remboursementMensuel = calculMensualite(montant, tauxMensuel, mois);
        console.log(remboursementMensuel);
      let balance = montant; // total
      let amortissementY = [];
      let amortissementM = [];

      for (let y=0; y<annee; y++) {
          let interestY = 0;  //Interest payment for year y
          let montantY = 0; //montant payment for year y
          for (let m=0; m<12; m++) {
              let interestM = balance * tauxMensuel;       //Interest payment for month m
              let montantM = remboursementMensuel - interestM; //montant payment for month m
              interestY = interestY + interestM;
              montantY = montantY + montantM;
              balance = balance - montantM;
              amortissementM.push({remboursementMensuel, capitalAmorti:montantM, interet:interestM, capitalRestantDu : balance});
          }
          amortissementY.push({remboursementMensuel, capitalAmorti:montantY, interet:interestY, capitalRestantDu : balance});
      }
      
      return {remboursementMensuel, amortissementY , amortissementM};
  };
  
// Gestion des événements button
  Array.from(document.querySelectorAll('button')).forEach(button => {
    if (button.id === 'calculerButton') {
         button.addEventListener("click", function () {
      let valeurs = getValues();
      if (!valeurs) return;
  
      let { montant, tauxMensuel, mois, annee } = valeurs;
      let { amortissementM } = calculAmortissement(montant, tauxMensuel, mois, annee);
      remplirTableau(amortissementM); // Utiliser la fonction importée
    });
    }
  });
  
  