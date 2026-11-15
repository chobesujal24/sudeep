import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultSiteSettings, normalizeSiteSettings, phoneHref, safeWebUrl, whatsappNumber } from '../lib/siteSettings.mjs';

test('public contact settings preserve defaults and normalize links', () => {
  const site = normalizeSiteSettings({ phone: '+91 (123) 456-7890', whatsapp: '+91 1234567890', email: 'hello@example.com' });
  assert.equal(phoneHref(site.phone), 'tel:+911234567890');
  assert.equal(whatsappNumber(site.whatsapp), '911234567890');
  assert.equal(site.email, 'hello@example.com');
  assert.equal(site.logo, '/logo.png');
});

test('unsafe links and invalid contact values fall back', () => {
  const site = normalizeSiteSettings({ logo: 'javascript:alert(1)', facebook: '//evil.example', phone: 'bad', email: 'bad' });
  assert.equal(site.logo, defaultSiteSettings.logo);
  assert.equal(site.facebook, '');
  assert.equal(site.phone, defaultSiteSettings.phone);
  assert.equal(site.email, defaultSiteSettings.email);
  assert.equal(safeWebUrl('/image.png'), '/image.png');
  assert.equal(safeWebUrl('/\\evil.example/path'), '');
});
