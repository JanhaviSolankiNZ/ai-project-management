'use client';

import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import { ReactNode } from 'react';

const clientSideEmotionCache = createEmotionCache();

export function EmotionCacheProvider({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      {children}
    </CacheProvider>
  );
}
