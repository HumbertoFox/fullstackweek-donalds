'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useEffect,
  useState
} from 'react';

interface Location {
  latitude: number;
  longitude: number;
};

export default function HomePage() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se o navegador tem suporte à Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          // position.coords tem o tipo GeolocationCoordinates
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        () => {
          // Caso ocorra algum erro ao obter a localização
          setError('Não foi possível obter sua localização');
        }
      );
    } else {
      setError('Geolocalização não é suportada neste navegador.');
    }
  }, []);
  return (
    <section className='w-full min-h-screen flex justify-center'>
      <div className='w-full max-w-screen-2xl flex flex-col items-center'>
        <h1>
          Selecione o Fest Food!
        </h1>


        {error && <p>{error}</p>}

        {location ? (
          <p>
            Localização: Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>Aguardando a localização...</p>
        )}

        <Link
          href='/fsw-donalds'
          title='FSW Donalds'
        >
          <Image
            src={'/fsw-logo.png'}
            alt='Logo Empresa'
            width={70}
            height={70}
          />
        </Link>
      </div>
    </section>
  );
}
