const contatore = document.getElementById("contatore");
const lista = document.getElementById("lista-giochi");
const campoRicerca = document.getElementById("ricerca");
const menuStato = document.getElementById("filtro");
const modulo = document.getElementById("modulo-ricerca");
let tuttiIGiochi = [];

function mostraGiochi(giochi) {
    lista.textContent = "";
    for (const gioco of giochi) {
        const voce = document.createElement("li");
        const intestazione = document.createElement("h3");
        intestazione.textContent = gioco.titolo;
        const dettagli = document.createElement("p");
        dettagli.textContent = gioco.genere + ", " + gioco.anno + ", " + gioco.stato;
        voce.append(intestazione);
        voce.append(dettagli);
        lista.append(voce);
    }
    if (giochi.length === 0) {
        contatore.textContent = "Nessun gioco trovato.";
    } else if (giochi.length === 1) {
        contatore.textContent = giochi.length + " gioco trovato.";
    } else {
        contatore.textContent = giochi.length + " giochi trovati.";
    }
}

async function caricaGiochi() {
    try {
        const risposta = await fetch("games.json");
        if (!risposta.ok) {
            throw new Error("Errore HTTP " + risposta.status);
        }
        const giochi = await risposta.json();
        tuttiIGiochi = giochi;
        applicaFiltri();
    }
    catch (errore) {
        contatore.textContent = "Impossibile caricare i giochi. Riprova più tardi.";
        console.error(errore);
    }
}

function applicaFiltri() {
    const testoCercato = campoRicerca.value.trim().toLowerCase();
    const statoScelto = menuStato.value;
    const risultati = tuttiIGiochi.filter(gioco => gioco.titolo.toLowerCase().includes(testoCercato) &&
        (statoScelto === "" || gioco.stato === statoScelto));
    mostraGiochi(risultati);
}

function bloccaInvio(evento) {
    evento.preventDefault();
}

modulo.addEventListener("submit", bloccaInvio);
campoRicerca.addEventListener("input", applicaFiltri);
menuStato.addEventListener("change", applicaFiltri);
caricaGiochi();