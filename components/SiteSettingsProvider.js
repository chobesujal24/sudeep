"use client";
import { createContext, useContext } from 'react';
import { defaultSiteSettings } from '@/lib/siteSettings.mjs';

const SiteContext = createContext(defaultSiteSettings);
export function SiteSettingsProvider({ value, children }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
export const useSiteSettings = () => useContext(SiteContext);
