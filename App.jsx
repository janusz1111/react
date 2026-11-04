import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


const questions = [
  {
    question: "Do czego służy hook useEffect?",
    answers: [
      "Wyłącznie do tworzenia stylów CSS",
      "Do synchronizowania komponentu z systemami zewnętrznymi i obsługi efektów ubocznych",
      "Do zastępowania wszystkich komponentów",
	  "Do przechowywania stanu zmiennej"
    ],
    correct: 1,
    explanation: "useEffect służy m.in. do synchronizacji z API, localStorage, tytułem strony, timerami lub zdarzeniami."
  },
  {
    question: "Kiedy uruchamia się efekt z pustą tablicą zależności []?",
    answers: [
      "Po zamontowaniu komponentu; w StrictMode dewelopersko może wystąpić dodatkowy cykl kontrolny",
      "Wyłącznie po kliknięciu przycisku",
      "Po każdym renderowaniu, bez wyjątku",
	  "Nigdy, do uruchomienia efektu tablica zależności jest niezbędna"
    ],
    correct: 0,
    explanation: "Pusta tablica oznacza brak zmiennych reaktywnych, od których efekt ma zależeć. StrictMode może dodatkowo sprawdzać poprawność efektu w trybie deweloperskim."
  },
  {
    question: "Co oznacza zapis useEffect(() => { ... }, [liczba])?",
    answers: [
      "Efekt nigdy się nie wykona",
      "React automatycznie ustawi liczbę na zero",
      "Efekt wykona się po zamontowaniu i ponownie, gdy zmieni się liczba",
	  "React automatycznie wygeneruje losowa liczbę"
    ],
    correct: 2,
    explanation: "Wartości w tablicy zależności są porównywane między renderowaniami. Zmiana liczba powoduje ponowne wykonanie efektu."
  },
  {
    question: "Co może się stać, gdy efekt przy każdym wykonaniu zmienia stan, od którego zależy?",
    answers: [
	  "Zostanie wygenerowane ostrzażenie o bładzie logicznym",
      "Może powstać pętla kolejnych renderowań",
      "React zawsze usunie komponent",
      "Nie ma to żadnego wpływu"
    ],
    correct: 1,
    explanation: "Jeżeli efekt zmienia swoją zależność, może uruchamiać się ponownie i tworzyć pętlę."
  },
  {
    question: "Do czego służy funkcja zwracana z useEffect?",
    answers: [
      "Do wyświetlania JSX",
	  "Do przechowywania stanu zmiennych",
      "Do sprzątania, np. zatrzymania interwału lub usunięcia nasłuchiwania zdarzeń",
      "Do importowania Reacta"
    ],
    correct: 2,
    explanation: "Funkcja czyszcząca jest wywoływana przed ponownym uruchomieniem efektu oraz przy odmontowaniu komponentu."
  },
  {
    question: "Który przykład poprawnie ustawia tytuł karty zależnie od licznika?",
    answers: [
      "useEffect(document.title = liczba, liczba);",
      "document.title = useEffect(liczba);",
	  "document.title = useEffect([]);",
	  "useEffect(() => { document.title = `Licznik: ${liczba}`; }, [liczba]);",
    ],
    correct: 3,
    explanation: "Kod efektu umieszczamy w funkcji przekazanej do useEffect, a liczba znajduje się w tablicy zależności."
  },
  {
    question: "Czy każdą wartość wyliczaną z propsów lub stanu należy zapisywać w stanie za pomocą useEffect?",
    answers: [
      "Tak, zawsze",
	  "Nie, nigdy",
      "Nie. Wartości pochodne zwykle można obliczyć bezpośrednio podczas renderowania",
      "Tak, ale tylko w dużych aplikacjach"
    ],
    correct: 2,
    explanation: "Niepotrzebny efekt może komplikować kod i powodować dodatkowe renderowania. Efekt jest przeznaczony przede wszystkim do synchronizacji z systemami zewnętrznymi."
  },
  {
    question: "Który zapis pozwala wykonać efekt po każdym renderowaniu?",
    answers: [
      "useEffect(() => { ... }, [])",
      "useEffect(() => { ... }, [false])",
      "useEffect(() => { ... })",
	  "useEffect(() => { ... }, [liczba])"
    ],
    correct: 2,
    explanation: "Jeśli pominiemy drugi argument, efekt jest uruchamiany po każdym renderowaniu komponentu."
  },
  {
    question: "Czym są props w React?",
    answers: [
      "Mechanizmem przekazywania danych do komponentu.",
      "Instrukcją tworzenia stylów CSS.",
      "Metodą zapisywania danych w bazie.",
	  "Sposobem na utworzenie przycisku."
    ],
    correct: 0,
    explanation: "Właściwości (ang. props) to informacje, które przekazujemy znacznikowi JSX-owemu."
  },
  {
    question: "Który zapis przekazuje tekst Anna jako właściwość name?",
    answers: [
      "<User name=\"Anna\" />",
      "<User name={Anna} />",
      "<User name:Anna />",
	  "<User props.name=\"Anna\" />"
    ],
    correct: 0,
    explanation: "Właściwości (ang. props) to informacje, które przekazujemy znacznikowi JSX-owemu."
  },
  {
    question: "Czy dwa komponenty User mogą wyświetlać różne dane?",
    answers: [
      "Nie, wszystkie muszą otrzymywać takie same dane.",
      "Tak, ale tylko gdy mają różne nazwy.",
      "Tak, mogą otrzymywać różne props.",
	  "Tak ale tyklo komponenty klasowe."
    ],
    correct: 2,
    explanation: "IProps pozwalają tworzyć uniwersalne komponenty, które mogą wyświetlać różne dane w zależności od tego, jakie wartości przekaże im komponent nadrzędny."
  }
];

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("useEffect-demo-count");
    return saved === null ? 0 : Number(saved);
  });
  const [showSaved, setShowSaved] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Efekt 1: aktualizacja tytułu karty po zmianie licznika.
  useEffect(() => {
    document.title = `Licznik: ${count} | useEffect`;
  }, [count]);

  // Efekt 2: zapis wartości licznika do localStorage.
  useEffect(() => {
    localStorage.setItem("useEffect-demo-count", String(count));
  }, [count]);

  const score = questions.reduce(
    (sum, question, index) => sum + (answers[index] === question.correct ? 1 : 0),
    0
  );

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  function resetCounter() {
    setCount(0);
    setShowSaved(false);
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-label">REACT.JS - TECHNIK PROGRAMISTA </div>
        <h1>Temat: <u>React - zastosowanie useEffect, useState.</u></h1>
        <p>W React <b>16.8</b> hooki zastąpiły metody cyklu życia z komponentów klasowych.</p>
		<p><b>useEffect</b> to hook w React, który służy do wykonywania, w sposób zorganizowany i reaktywny, "efektów ubocznych" w komponentach funkcyjnych – np.: <br/>
		- pobierania danych, <br/>
		- manipulacji DOM, <br/>
		-tworzenia subskrypcji.</p>
		<p>Hook <b>useState</b> w Reakcie jest używany do przechowywania zmiennej stanu w komponentach funkcyjnych.<br/> Jest to hook, który pozwala na dodanie do komponentu zmiennej stanu, a także na jej aktualizację. Wartość stanu jest zwracana jako dwuelementowa tablica, gdzie bieżąca wartość stanu jest zwracana przy pierwszym renderowaniu, a funkcja set jest używana do aktualizacji wartości. Przy każdym wywoływaniu set, React ponownie renderuje komponent z nową wartością.
		<br/>
          <u>Poznaj efekty uboczne, sprawdź działanie hooka w praktyce i rozwiąż
          test podsumowujący lekcję.</u>
        </p>
        <div className="hero-tags">
          <span>📘 Teoria</span><span>⚙️ Praktyka</span><span>✓ Test wiedzy</span>
        </div>
      </header>

      <main>
        <section className="panel intro">
          <div className="section-heading">
            <span className="number">01</span>
            <div>
              <h2>Co robi useEffect?</h2>
              <p>Hook useEffect służy do synchronizacji komponentu React z systemem zewnętrznym.</p>
			  <p>Niektóre komponenty muszą pozostać połączone z siecią, z jakimś API przeglądarki lub biblioteką firm trzecich, podczas gdy są wyświetlane na stronie. Te systemy nie są kontrolowane przez React, dlatego nazywa się je zewnętrznymi.</p>
            </div>
          </div>
          <div className="concept-grid">
            <article className="concept-card">
              <div className="concept-icon">🌐</div>
              <h3>Przykłady zastosowań</h3>
              <p>Pobieranie danych z API, tytuł karty, localStorage, timery i nasłuchiwanie zdarzeń.</p>
            </article>
            <article className="concept-card">
              <div className="concept-icon">🧭</div>
              <h3>Tablica zależności</h3>
              <p>Określa, po zmianie których wartości efekt ma uruchomić się ponownie.</p>
            </article>
            <article className="concept-card">
              <div className="concept-icon">🧹</div>
              <h3>Czyszczenie efektu</h3>
              <p>Funkcja zwracana z efektu może zatrzymać timer lub usunąć nasłuchiwanie.</p>
            </article>
          </div>

          <div className="code-comparison">
            <div>
              <div className="code-title">Pusta tablica zależności</div>
              <pre><code>{`useEffect(() => {\n  console.log("Po zamontowaniu");\n\r}, []);`}</code></pre>
              <p className="code-note">Efekt po zamontowaniu komponentu. W StrictMode możliwy dodatkowy cykl kontrolny w trybie deweloperskim.</p>
            </div>
            <div>
              <div className="code-title">Zależność od stanu</div>
              <pre><code>{`useEffect(() => {\n  document.title = liczba;\n}, [liczba]);`}</code></pre>
              <p className="code-note">Efekt po zamontowaniu i po zmianie wartości <code>liczba</code>.</p>
            </div>
          </div>
        </section>

        <section className="panel demo-panel">
		
			<div id="zadanie1" className="section-heading">
						<h1>Zadanie</h1>
				
				<ul id = "zadanie"> <h3>Opracuj komponent Uczen, który będzie wyświetlał:</h3>
				<li>imię i nazwisko ucznia;</li>
				<li>klasę;</li>
				<li>nauczany zawód;</li>
				<li>średnią ocen.</li>
				</ul>
			</div>
          <div className="section-heading">
		    
            <span className="number">02</span>
            <div>
              <h2>Ćwiczenie: interaktywny licznik</h2>
              <p>Zmień stan i obserwuj efekt. Wartość zostaje zapisana w przeglądarce.</p>
            </div>
          </div>

          <div className="demo-layout">
            <div className="counter-card">
              <span className="counter-label">AKTUALNA WARTOŚĆ</span>
              <div className="counter-value">{count}</div>
              <div className="counter-controls">
                <button className="button primary" onClick={() => setCount(value => Math.min(+20, value + 2))}>＋ Zwiększ o 2</button>
                <button className="button secondary" onClick={() => setCount(value => Math.max(-10, value - 1))}>− Zmniejsz</button>
                <button className="button ghost" onClick={resetCounter}>Wyzeruj</button>
              </div>
            </div>
            <div className="effect-status">
              <div className="status-row">
                <span className="status-dot" />
                <div><strong>Efekt tytułu strony</strong><p>document.title reaguje na zmianę licznika.</p></div>
              </div>
              <div className="status-row">
                <span className="status-dot purple" />
                <div><strong>Efekt localStorage</strong><p>Wartość jest zapisywana pod kluczem <code>useEffect-demo-count</code>.</p></div>
              </div>
              <div className="stored-value">
                <span>Wartość zapisana w tej karcie przeglądarki</span>
                <strong>{localStorage.getItem("useEffect-demo-count") ?? "—"}</strong>
              </div>
              <button className="text-button" onClick={() => setShowSaved(value => !value)}>
                {showSaved ? "Ukryj wyjaśnienie" : "Jak to działa?"}
              </button>
              {showSaved && (
                <div className="explanation">
                  <code>useEffect(..., [count])</code> uruchamia efekt, gdy zmieni się <code>count</code>.
                  Pierwszy efekt aktualizuje tytuł karty, a drugi zapisuje wartość w pamięci przeglądarki.
                  Po odświeżeniu strony licznik odczytuje zapisaną wartość.
                </div>
              )}
            </div>
          </div>
          <div className="teacher-tip"><strong>Wskazówka:</strong> spójrz na tytuł karty przeglądarki u góry okna. Zmienia się razem z licznikiem.</div>
        </section>

        <section className="panel test-panel">
          <div className="section-heading">
            <span className="number">03</span>
            <div>
              <h2>Test sprawdzający wiedzę</h2>
              <p>{questions.length} pytań jednokrotnego wyboru. Wybierz jedną odpowiedź w każdym pytaniu.</p>
            </div>
          </div>

          <div className="test-progress">
            <span>Udzielono odpowiedzi: {Object.keys(answers).length} / {questions.length}</span>
            <div className="progress-track"><div style={{ width: `${Object.keys(answers).length / questions.length * 100}%` }} /></div>
          </div>

          <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            {questions.map((question, index) => (
              <fieldset className="question" key={question.question}>
                <legend><span className="question-number">{String(index + 1).padStart(2, "0")}</span>{question.question}</legend>
                <div className="answer-list">
                  {question.answers.map((answer, answerIndex) => {
                    const isSelected = answers[index] === answerIndex;
                    const isCorrect = submitted && answerIndex === question.correct;
                    const isWrongSelected = submitted && isSelected && answerIndex !== question.correct;
                    return (
                      <label
                        key={answer}
                        className={`answer-option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrongSelected ? "wrong" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={answerIndex}
                          checked={isSelected}
                          disabled={submitted}
                          onChange={() => setAnswers(current => ({ ...current, [index]: answerIndex }))}
                        />
                        <span>{answer}</span>
                        {isCorrect && <b>Poprawna</b>}
                      </label>
                    );
                  })}
                </div>
                {submitted && <p className="feedback">{question.explanation}</p>}
              </fieldset>
            ))}

            {submitted ? (
              <div className="result-box">
                <div>
                  <span className="result-caption">TWÓJ WYNIK</span>
                  <div className="result-score">{score} <small>/ {questions.length} pkt</small></div>
                  <p>{score === questions.length ? "Świetnie! Bardzo dobrze opanowano temat." : score >= 6 ? "Dobra praca! Przejrzyj wyjaśnienia przy pytaniach." : "Warto wrócić do części teoretycznej i spróbować ponownie."}</p>
                </div>
                <button type="button" className="button primary" onClick={resetQuiz}>Rozwiąż ponownie</button>
              </div>
            ) : (
              <div className="submit-row">
                <p>Przed sprawdzeniem odpowiedzi możesz zmienić zaznaczenia.</p>
                <button className="button primary" type="submit">Sprawdź test</button>
              </div>
            )}
          </form>
        </section>

        <section className="panel summary-panel">
          <div className="section-heading">
            <span className="number">04</span>
            <div><h2>Podsumowanie lekcji</h2><p>Zapamiętaj najważniejsze zasady.</p></div>
          </div>
          <ul className="summary-list">
            <li><span>✓</span><div><strong>useEffect</strong><p>Synchronizuje komponent z systemami zewnętrznymi.</p></div></li>
            <li><span>✓</span><div><strong>Tablica zależności</strong><p><code>[]</code> – po zamontowaniu; <code>[wartość]</code> – po zmianie zależności; brak tablicy – po każdym renderowaniu.</p></div></li>
            <li><span>✓</span><div><strong>Funkcja czyszcząca</strong><p>Sprząta zasoby, np. zatrzymuje interwał przed kolejnym uruchomieniem efektu lub odmontowaniem komponentu.</p></div></li>
            <li><span>✓</span><div><strong>Używaj rozsądnie</strong><p>Nie dodawaj efektu, gdy potrzebną wartość można prosto obliczyć podczas renderowania.</p></div></li>
          </ul>
        </section>
      </main>

      <footer>Materiał na zajęcia z przedmiotu: <b>progrmowanie zaawansowanych aplikacji webowych</b> · kl 4a Technik programista · React.js</footer>
    </div>
  );
}

export default App;