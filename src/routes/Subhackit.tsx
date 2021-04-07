import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type UrlParams = {
  slug: string,
}

type Hackit = {
  name: string,
  description: string,
}

const database: Hackit[] = [
  {
    name: 'dogs',
    description: 'all kinds of puppies!',
  }
]

const Subhackit = () => {
  const { slug } = useParams<UrlParams>();

  const [subhackitName, setSubhackitName] = useState('');
  const [subhackit, setSubhackit] = useState<Hackit>();

  useEffect(() => {
    setSubhackitName(slug);
  }, [slug]);

  useEffect(() => {
    setSubhackit(database.find((hackit) => hackit.name === subhackitName));
  }, [subhackitName])

  return (
    <div>
      <h2>
        {subhackit ? (
          <div>
            <h2>
              {subhackit.name}
            </h2>
            <p>
              {subhackit.description}
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