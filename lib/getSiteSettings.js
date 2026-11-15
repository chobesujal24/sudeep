import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { supabase } from './supabase';
import { normalizeSiteSettings } from './siteSettings.mjs';

const loadSettings = unstable_cache(async (id) => {
  const { data, error } = await supabase.from('settings').select('data').eq('id', id).maybeSingle();
  if (error) throw error;
  return data?.data || {};
}, ['public-site-settings'], { revalidate: 60 });

export const getSettings = cache(async (id) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return {};
  try { return await loadSettings(id); }
  catch (error) { console.error(`Unable to load ${id}:`, error); return {}; }
});
export const getSiteSettings = cache(async () => normalizeSiteSettings(await getSettings('siteSettings')));
