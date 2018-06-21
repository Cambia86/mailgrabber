import { Component } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "privacy-app",
    templateUrl: './privacy.component.html'
  })
  
  
  
  export class PrivacyComponent {
    public tvtext="Informativa resa ai sensi dell’art.13 del Regolamento UE 679/2016, a coloro che interagiscono con i servizi web di Malloy Distribution Srl:"+
    "Malloy Distribution Srl riconosce l’importanza della protezione dei dati personali, si impegna a rispettare la privacy degli utilizzatori, a trattare i dati privati con cautela e riservatezza ed a non utilizzarli per finalità diverse da quelle specificate in seguito."+
    "A tal fine, in questa policy si descrivono le modalità di gestione del sito in riferimento al trattamento dei dati personali degli utenti che lo consultano. "+
    "Questa Policy potrà essere modificata o aggiornata in qualsiasi momento da Malloy Distribution Srl."+
    "L’informativa è resa solo per il presente sito e non anche per altri siti web eventualmente consultati dall’utente tramite link."+
    "Titolare del trattamento"+
    "Il Titolare del trattamento è: Malloy Distribution Srl, Via Michelangelo Buonarroti 5, 20090 Segrate (MI), d’ora in avanti anche “Malloy”."+
    "Dati e finalità del trattamento"+
    "Malloy informa gli utenti del sito che i dati raccolti verranno utilizzati esclusivamente per gli scopi specificati di seguito. I dati oggetto del trattamento sono i dati di navigazione e i dati forniti volontariamente dall’utente. "+
    "1. Dati di navigazione"+
    "I sistemi informatici preposti al funzionamento del sito web acquisiscono alcuni dati necessari al funzionamento della piattaforma ed informazioni la cui trasmissione è implicita nei protocolli utilizzati per la connessione e la navigazione internet."+
    "Vengono anche acquisiti alcune informazioni relative alla sessione del browser e dati generici relativi al dispositivo utilizzato dall’utente. Tutti i dati vengono acquisiti in forma anonima e non riconducibili, comunque, ad un utente specifico o per finalità di profilazione."+
    "2. Dati forniti volontariamente dall’utente -area lavora con noi"+
    "L’utente, per accedere ad alcuni servizi del sito web (sezione “lavora con noi”) fornisce a Malloy diverse tipologie di dati in forma spontanea previa presa visione della presente informativa ed eventuale consenso al trattamento per uno o più dei fini previsti ed elencati di seguito."+
    "3. Dati forniti volontariamente dall’utente -iscrizione alla newsletter"+
    "L’utente, per accedere ad alcuni servizi del sito web (sezione “lavora con noi”) fornisce a Malloy diverse tipologie di dati in forma spontanea previa presa visione della presente informativa ed eventuale consenso al trattamento per uno o più dei fini previsti ed elencati di seguito."+
    "4. Dati forniti volontariamente dall’utente – registrazione utente e profilazione"+
    "In fase di registrazione, nell’area dedicata del sito, sarà prevista nei confronti dell’utente un’esplicita richiesta di consenso all’attività di profilazione al fine di poter inviare comunicazioni commerciale maggiormente in linea con le abitudini e preferenze di consumo dell’utente. Mediante la profilazione, infatti, si raccolgono informazioni su un individuo (o gruppo di individui), si analizzano le sue caratteristiche o modelli di comportamento e si inserisce il profilo individuale in una certa “categoria” o “segmento” per dar luogo ad ulteriori valutazioni o previsioni riguardanti, ad esempio, i suoi interessi o comportamento probabile."+
    "5. Dati forniti volontariamente dal cliente presso i punti vendita – indirizzo mail"+
    "L’inserimento dell’indirizzo e-mail da parte del cliente, all’interno dei dispositivi all’interno dei punti vendita “Boxeur Des Rues”, consente a Malloy Distribution Srl di contattare il cliente per le finalità di seguito elencate e comunque senza effettuare attività di profilazione. Sarà sempre possibile per il cliente esercitare i propri diritti previsti in qualità di interessato. "+
    " Malloy utilizzerà i dati raccolti per:"+
    "a)	finalità connesse all’utilizzo dei servizi offerti dal sito (navigazione sito);"+
    "b)	attività strettamente connesse e strumentali alla gestione dei rapporti con la clientela e dei potenziali collaboratori (richieste di contatto);"+
    "c)	attività di marketing, anche dietro eventuale specifico consenso dell’utente, finalizzate a ricerche di mercato; analisi economiche e statistiche; invio di materiale pubblicitario/informativo/promozionale, invio di newsletters, altresì in relazione a programmi e promozioni, anche on-line, comunicazioni, sviluppo e mantenimento dei rapporti commerciali."+
    "d)	trattare i dati relativi a curricula per valutazione candidature lavorative."+
    "Il conferimento dei dati per le finalità di cui alle lettere c) d) è facoltativo e deve essere prestato secondo le modalità espressamente previste dall’articolo 7 del GDPR, direttamente dal sito internet."+
    "Le comunicazioni relative all’attività di marketing potranno avvenire mediante l’utilizzo di modalità tradizionali (es., posta cartacea, telefonate con operatore), automatizzate (es., telefonate senza operatore) ed assimilabili (es: fax, e-mail, sms, newsletter)."+
    "Salvo dissenso, Malloy potrà continuare a inviare a propri clienti le comunicazioni commerciali relative a servizi analoghi a quelli cui stanno già usufruendo."+
    "Modalità di trattamento"+
    "Il trattamento dei dati verrà realizzato ai sensi dell’Art. 4 n. 2) del GDPR, per mezzo delle seguenti operazioni: raccolta, registrazione, organizzazione, conservazione, consultazione, elaborazione, modificazione, selezione, estrazione, raffronto, utilizzo, interconnessione, blocco, comunicazione, cancellazione e distruzione dei dati."+
    "I dati verranno sottoposti a trattamento sia cartaceo che elettronico e/o automatizzato."+
    "I dati a partire dal loro ricevimento/aggiornamento, saranno conservati per un periodo congruo rispetto alle finalità del trattamento sopra riportate. Per avere maggiori informazioni rispetto ai termini di conservazione dei dati è possibile scrivere a privacy@boxeurdesrues.com."+
    "Comunicazione e trasferimento dei dati"+
    "I dati, oggetto del trattamento, non saranno diffusi; potranno invece, per le finalità indicate nella presente informativa, essere comunicati a soggetti terzi, tra cui partners commerciali, consulenti e liberi professionisti, banche ed istituti di credito, assicurazioni, società finanziarie, di factoring, di leasing, di servizi, di gestione e di recupero del credito, revisori dei conti, società di recupero crediti, Enti pubblici, Organismi di revisione o vigilanza, per adempiere ad obblighi derivanti dalla legge, regolamenti, normative comunitarie o per aspetti riguardanti la gestione ed esecuzione del rapporto giuridico con Voi intercorrenti o intercorsi."+
    "I dati verranno trattati dai seguenti soggetti:"+
    "•	Dipendenti della società che operano come persone autorizzate al trattamento dei dati in funzione delle mansioni svolte ed adeguatamente istruite."+
    "•	Responsabili Esterni ai sensi dell’art.28 GDPR."+
    ""+
    "L’elenco dei Responsabili per il trattamento dei dati personali è disponibile presso la sede legale di Malloy. "+
    "Per tutte le finalità indicate nella presente informativa i dati potranno essere comunicati anche all’estero, all’interno e all’esterno dell’Unione Europea, nel rispetto dei diritti e delle garanzie previsti dalla normativa vigente, previa verifica che il Paese in questione garantisca un livello di protezione 'adeguato' ai sensi di quanto previsto dal GDPR. "+
    "Diritti dell’interessato "+
    "Si precisa che nella qualità di interessati, in qualsiasi momento si potrà chiedere: "+
    "a)	l’accesso ai dati personali;"+
    "b)	la loro rettifica in caso di inesattezza;"+
    "c)	la cancellazione;"+
    "d)	la limitazione del trattamento;"+
    "e)	il diritto di opposizione al trattamento dei dati ove ricorrano i presupposti;"+
    "a)	il diritto alla portabilità dei dati, ossia di ricevere in un formato strutturato di uso comune e leggibile da dispositivo automatico, i dati personali forniti."+
    "Per quanto non espressamente previsto dalle disposizioni quivi richiamate si rimanda integralmente alla normativa in vigore in tema Privacy e specificatamente agli artt. 15, 16, 17, 18, 20 e 21 del GDPR."+
    "Revoca del consenso"+
    "Il consenso potrà essere revocato, in qualsiasi momento, senza che ciò tuttavia possa:"+
    "•	pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca;"+
    "•	pregiudicare ulteriori trattamenti degli stessi dati fondati su altre basi giuridiche come ad esempio obblighi contrattuali o di legge."+
    "Per ulteriori delucidazioni circa la presente informativa o su qualsiasi tematica privacy, o nel caso in cui desideriate esercitare i diritti sopra citati o revocare il consenso, potrete scrivere a privacy@boxeurdesrues.com."+
    ""
    
  
    constructor(private router:Router){

    }

    back(){
        this.router.navigate(["/home"])
    }
  }