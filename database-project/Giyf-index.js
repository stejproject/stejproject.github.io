import {
  j as d,
  _ as n,
  r as p,
  W as u,
  R as f,
  a as m
}
from'./vendor.a1a49b64.js';
const g = function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) c(e);
  new MutationObserver(e=>{
    for (const o of e) if (o.type === 'childList') for (const l of o.addedNodes) l.tagName === 'LINK' && l.rel === 'modulepreload' && c(l)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });
  function a(e) {
    const o = {
    };
    return e.integrity && (o.integrity = e.integrity),
    e.referrerpolicy && (o.referrerPolicy = e.referrerpolicy),
    e.crossorigin === 'use-credentials' ? o.credentials = 'include' : e.crossorigin === 'anonymous' ? o.credentials = 'omit' : o.credentials = 'same-origin',
    o
  }
  function c(e) {
    if (e.ep) return;
    e.ep = !0;
    const o = a(e);
    fetch(e.href, o)
  }
};
g();
var h = '/assets/G.09599e48.webp',
b = '/assets/Google_logo.a33a47a2.svg';
const t = d.exports.jsx,
i = d.exports.jsxs;
function y() {
  const r = p.exports.useRef('');
  return i(G, {
    children: [
      i('h1', {
        children: [
          t(x, {
            children: 'G'
          }),
          t(w, {
            children: 'i'
          }),
          t(v, {
            children: 'y'
          }),
          t(_, {
            children: 'F'
          })
        ]
      }),
      t('h2', {
        children: 'Google is your Friend, but you don\'t seem to understands!'
      }),
      i(I, {
        children: [
          i('form', {
            onSubmit: a=>{
              if (a.preventDefault(), !r.current.value) return null;
              window.location.assign(`https://www.google.com/search?q=${ r.current.value }`)
            },
            children: [
              t('input', {
                name: 'search',
                type: 'text',
                ref: r,
                autoComplete: 'off'
              }),
              t('button', {
                type: 'submit',
                children: 'Search'
              })
            ]
          }),
          t(S, {
            src: b,
            alt: 'google logo'
          })
        ]
      }),
      t(k, {
        children: t('img', {
          src: h,
          alt: 'giyf'
        })
      }),
      t('p', {
        children: 'Someone thinks you\'re too lazy to use Google before asking a question. Now someone is tired of answering stupid questions and sent you a link to this site to point out that you can easily find the answer yourself. Please do so.'
      })
    ]
  })
}
