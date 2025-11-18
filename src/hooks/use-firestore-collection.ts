'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  type DocumentData,
  type Firestore,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase-provider';

export interface FirestoreCollectionState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export type MapDocumentFn<T> = (
  doc: QueryDocumentSnapshot<DocumentData>
) => T;

function mapWithFallback<T>(mapDocument: MapDocumentFn<T>) {
  return (snapshot: QueryDocumentSnapshot<DocumentData>): T => mapDocument(snapshot);
}

export function useFirestoreCollection<T>(
  path: string,
  mapDocument: MapDocumentFn<T>,
  options?: { listen?: boolean }
): FirestoreCollectionState<T> {
  const { firestore } = useFirebase();
  const [state, setState] = useState<FirestoreCollectionState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    const mapped = mapWithFallback(mapDocument);

    const load = async (client: Firestore) => {
      try {
        const q = query(collection(client, path));

        if (options?.listen) {
          unsubscribe = onSnapshot(
            q,
            (snapshot) => {
              setState({
                data: snapshot.docs.map(mapped),
                loading: false,
                error: null,
              });
            },
            (error) => {
              setState({ data: [], loading: false, error: error.message });
            }
          );
          return;
        }

        const snapshot = await getDocs(q);
        setState({
          data: snapshot.docs.map(mapped),
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Error loading data',
        });
      }
    };

    load(firestore);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [firestore, mapDocument, options?.listen, path]);

  return state;
}
