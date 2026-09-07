export const datasetLoaders = {
  'spanish-basic': () => import('./spanishTranscript.json'),
  'spanish-advanced': () => import('./advancedSpanishTranscript.json'),
  'spanish-builder': () => import('./spanishBuilder.json'),
  'spanish-resources': () => import('./spanishResources.json'),
}
