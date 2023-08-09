import React, { useState } from 'react';
import axios from 'axios';

function NumberList() {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async (urls) => {
    try {
      const responses = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await axios.get(url, {
              headers: {
                'Api-Key': '20230804'
              }
            });
            return response.data.numbers;
          } catch (error) {
            console.error(`Error fetching numbers from ${url}:`, error);
            return [];
          }
        })
      );

      const mergedNumbers = Array.from(new Set(responses.flat()));
      setNumbers(mergedNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const handleFetch = () => {
    const urlInputs = document.querySelectorAll('.url-input');
    const urls = Array.from(urlInputs).map((input) => input.value);

    fetchNumbers(urls);
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <div>
        {numbers.length > 0 && (
          <div>
            <h2>Merged Unique Integers</h2>
            <ul>
              {numbers.map((number, index) => (
                <li key={index}>{number}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h2>Enter URLs</h2>
        <div>
          <input type="text" className="url-input" defaultValue="http://20.244.56.144/numbers/primes" />
        </div>
        <div>
          <input type="text" className="url-input" defaultValue="http://20.244.56.144/numbers/fibo" />
        </div>
        <div>
          <input type="text" className="url-input" defaultValue="http://20.244.56.144/numbers/odd" />
        </div>
        <div>
          <input type="text" className="url-input" defaultValue="http://20.244.56.144/numbers/rand" />
        </div>
        <button onClick={handleFetch}>Fetch Numbers</button>
      </div>
    </div>
  );
}

export default NumberList;
