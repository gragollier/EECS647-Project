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
const path = '/getsubhackit';

const Subhackit = () => {
  const { slug } = useParams<UrlParams>();

  const [subhackitName, setSubhackitName] = useState('');
  const [subhackit, setSubhackit] = useState<Hackit>();

  useEffect(() => {
    setSubhackitName(slug);
  }, [slug]);

  useEffect(() => {
    if (subhackitName){
      const request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          Name: subhackitName,
        }),
      };
  
      fetch(api + path, request)
        .then(response => response.json())
        .then(data => {
          setSubhackit(data.Subhackit);
        });
    }
  }, [subhackitName])

  return (
    <div>
      <h2>
        {subhackit ? (
          <div>
            <h2>
              {subhackit.Name}
            </h2>
            <p>
              {subhackit.Description}
            </p>
          </div>
        ) : (
          <div>
            <h2>
              Subhackit not found
            </h2>
          </div>
        )}
      </h2>
    </div>
  )
};

export default Subhackit;