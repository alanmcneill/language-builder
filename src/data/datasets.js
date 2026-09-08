export const datasetLoaders = {
  'spanish-basic': () => import('./basicSpanish.json'),
  'spanish-intermediate': () => import('./intermediateSpanish.json'),
  'spanish-advanced': () => import('./advancedSpanish.json'),
  'spanish-resources': () => import('./spanishResources.json'),
}
