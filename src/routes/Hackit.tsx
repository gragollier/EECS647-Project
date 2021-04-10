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

const HackitPage = () => {
  const { slug } = useParams<UrlParams>();

  const [hackit, setHackit] = useState<Hackit>();

  useEffect(() => {
    setHackit(database.find((hackit) => {
      return hackit.name === slug
    }));
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