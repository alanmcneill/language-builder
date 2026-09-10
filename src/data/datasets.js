export const datasetLoaders = {
  'spanish-basic': () => import('./basicSpanish.json'),
  'spanish-intermediate': () => import('./intermediateSpanish.json'),
  'spanish-advanced': () => import('./advancedSpanish.json'),
  'french-basic': () => import('./basicFrench.json'),

  'spanish-100': () => import('./spanish100.json'),
  'spanish-sentences': () => import('./spanishSentences.json'),
//   'spanish-tenses': () => import('./spanishTenses.json'),
//   'spanish-regular-verbs': () => import('./spanishRegularVerbs.json'),
//   'spanish-ser-estar': () => import('./spanishSerEstar.json'),
//   'spanish-irregular-verbs': () => import('./spanishIrregularVerbs.json'),
//   'spanish-stem-changing-verbs': () => import('./spanishStemChangingVerbs.json'),
}