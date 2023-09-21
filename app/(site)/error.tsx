'use client'; // Error components must be Client components
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);

  }, [error]);
 
  return (
    <div>
      <h2>Une erreur est survenue lors du rendment de la page </h2>
      <p> {JSON.stringify(error)} </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Cliquez ici pour actualiser la page
      </button>
    </div>
  );
}