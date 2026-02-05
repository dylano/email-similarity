import { useState } from 'react';
import { CmpStr } from 'cmpstr';
import gmailIcon from './assets/gmail.svg';
import outlookIcon from './assets/outlook.svg';
import yahooIcon from './assets/yahoo.svg';
import aolIcon from './assets/aol.svg';
import './App.css';

const cmpJaroWinkler = CmpStr.create().setMetric('jaroWinkler');
const providers = [
  { name: 'Gmail', domain: 'gmail.com', icon: gmailIcon },
  { name: 'Yahoo', domain: 'yahoo.com', icon: yahooIcon },
  { name: 'Outlook', domain: 'outlook.com', icon: outlookIcon },
  { name: 'AOL', domain: 'aol.com', icon: aolIcon },
];

function App() {
  const [domain, setDomain] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('domain') ?? '';
  });
  const normalizedDomain = domain.trim().toLowerCase();

  const getScore = (cmp, provider) =>
    normalizedDomain.length === 0
      ? null
      : cmp.compare(normalizedDomain, provider.domain);

  const isHighlighted = (provider) => {
    if (normalizedDomain.length === 0) {
      return false;
    }

    const score = getScore(cmpJaroWinkler, provider);
    return score !== null && score > 0.9 && score < 1;
  };

  return (
    <main className="app">
      <h1>Email Domain Similarity</h1>

      <form
        className="domain-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="domain" className="domain-label">
          <span className="prefix">user@</span>
          <input
            id="domain"
            name="domain"
            type="text"
            placeholder="example.com"
            autoComplete="off"
            spellCheck="false"
            inputMode="email"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
          />
        </label>
      </form>

      <table className="provider-table">
        <thead>
          <tr>
            {providers.map((provider) => (
              <th
                key={provider.domain}
                className={isHighlighted(provider) ? 'highlight' : ''}
              >
                <div className="provider-header">
                  <img
                    src={provider.icon}
                    alt={`${provider.name} icon`}
                    className="provider-icon"
                  />
                  <div className="provider-text">
                    <span className="provider-name">{provider.name}</span>
                    <span className="provider-domain">{provider.domain}</span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {providers.map((provider) => {
              const score = getScore(cmpJaroWinkler, provider);
              return (
                <td
                  key={provider.domain}
                  className={isHighlighted(provider) ? 'highlight' : ''}
                >
                  {score === null ? '-' : score.toFixed(3)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <p className="disclaimer">
        Similarity scores based on{' '}
        <a
          href="https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance"
          target="_blank"
          rel="noreferrer"
        >
          Jaro-Winkler
        </a>{' '}
        distance.
      </p>
    </main>
  );
}

export default App;
