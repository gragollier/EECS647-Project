import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type UrlParams = {
  slug: string,
}

type Hackit = {
  Name: string,
  Description: string,
}

const api = 'https://1pyrtegry1.execute-api.us-east-1.amazonaws.com/prod';
const path = '/gethackit';

const HackitPage = () => {
  const { slug } = useParams<UrlParams>();

  const [hackit, setHackit] = useState<Hackit>();

  useEffect(() => {
    if (slug){
      const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          Name: slug,
        }),
      };
  
      fetch(api + path, request)
        .then(response => response.json())
        .then(data => {
          setHackit(data.hackit);
        });
    }
  }, [slug])

  return (
    <div>
      <h2>
        {hackit ? (
          <div>
            <h2>
              {hackit.name}
            </h2>
            <p>
              {hackit.description}
            </p>
          </div>
        ) : (
          <div>
            <h2>
              Hackit not found
            </h2>
          </div>
        )}
      </h2>
    </div>
  )
};

export default HackitPage;