const contatore = document.getElementById("contatore");
const lista = document.getElementById("lista-giochi");
function mostraGiochi(giochi) {
    lista.textContent = "";
    for (const gioco of giochi) {
        const voce = document.createElement ("li");
        const intestazione = document.createElement("h3");
        intestazione.textContent = gioco.titolo;
        const dettagli = document.createElement("p");
        dettagli.textContent = gioco.genere + ", "  + gioco.anno + ", " + gioco.stato;
        voce.append(intestazione);
        voce.append(dettagli);
        lista.append(voce);
    }
    contatore.textContent = giochi.length + " giochi";
}
async function caricaGiochi() {
    try  {
        const risposta = await fetch("games.json");
        if (!risposta.ok) {
            throw new Error("Errore HTTP " + risposta.status);  
        }
        const giochi = await risposta.json();
        mostraGiochi(giochi); 
    }
    catch (errore) {
        contatore.textContent = "Impossibile caricare i giochi. Riprova più tardi.";
        console.error(errore);
    }
}
caricaGiochi();