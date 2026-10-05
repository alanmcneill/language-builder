export const datasetLoaders = {
  'spanish-i': () => import('./basicSpanish.json'),
  'spanish-ii': () => import('./intermediateSpanish.json'),
  'spanish-iii': () => import('./advancedSpanish.json'),
  'french-i': () => import('./basicFrench.json'),
//'italian-i': () => import('./basicItalian.json'),

  'spanish-top-100-words': () => import('./spanish100.json'),
  'spanish-sentences': () => import('./spanishSentences.json'),
  'spanish-tenses': () => import('./spanishTenses.json'),
  'spanish-regular-verbs': () => import('./spanishRegularVerbs.json'),
  'spanish-ser-estar': () => import('./spanishSerEstar.json'),
  'spanish-irregular-verbs': () => import('./spanishIrregularVerbs.json'),
//'spanish-stem-changing-verbs': () => import('./spanishStemChangingVerbs.json'),
}