import { Box, ChakraProvider, Container, defaultSystem, Heading, HStack, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EmptyState from './components/EmptyState'
import LanguageCard from './components/LanguageCard'
import LanguageMenu from './components/LanguageMenu'
import LoadingState from './components/LoadingState'
import ProgressControls from './components/ProgressControls'
import SetCompletionCard from './components/SetCompletionCard'
import SetIntroCard from './components/SetIntroCard'
import { datasetLoaders } from './data/datasets'
import { readProgress, writeProgress } from './storage'

const progressStorageKeyPrefix = 'language-builder-current-index-'

function App() {
  const [datasetKey, setDatasetKey] = useState('spanish-basic')
  const [loadedDataset, setLoadedDataset] = useState({ key: null, transcript: null })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let cancelled = false

    datasetLoaders[datasetKey]().then(({ default: loadedTranscript }) => {
      if (cancelled) return

      setLoadedDataset({ key: datasetKey, transcript: loadedTranscript })
      const progressStorageKey = `${progressStorageKeyPrefix}${datasetKey}`
      const savedIndex = readProgress(progressStorageKey)
      setCurrentIndex(Math.min(Math.max(savedIndex, 0), loadedTranscript.length + 1))
    })

    return () => {
      cancelled = true
    }
  }, [datasetKey])

  useEffect(() => {
    if (loadedDataset.key !== datasetKey) return

    writeProgress(`${progressStorageKeyPrefix}${datasetKey}`, currentIndex)
  }, [currentIndex, datasetKey, loadedDataset.key])

  const transcript = loadedDataset.key === datasetKey ? loadedDataset.transcript : null

  if (!transcript) {
    return (
      <ChakraProvider value={defaultSystem}>
        <LoadingState />
      </ChakraProvider>
    )
  }

  const phraseIndex = currentIndex - 1
  const currentItem = transcript[phraseIndex]
  const lastPosition = transcript.length + 1

  const handleNext = () => {
    setCurrentIndex((current) => Math.min(current + 1, lastPosition))
  }

  const handlePrevious = () => {
    setCurrentIndex((current) => Math.max(current - 1, 0))
  }

  return (
    <ChakraProvider value={defaultSystem}>
      <Box minH="100vh" bg="gray.800" color="whiteAlpha.900" py={10} className="dark">
        <Container maxW="container.md">
          <HStack justify="space-between" mb={8}>
            <Heading as="h1" size="lg" color="teal.300">
              LEXICON
            </Heading>
            <LanguageMenu onSelect={setDatasetKey} />
          </HStack>

          <Stack spacing={8} align="center">
            <Box w="full" maxW="720px">
              {transcript.length === 0 ? (
                <EmptyState message="This collection has no phrases yet." />
              ) : (
                <>
                  {currentIndex === 0 ? (
                    <SetIntroCard onNext={handleNext} />
                  ) : currentIndex === lastPosition ? (
                    <SetCompletionCard onPrevious={handlePrevious} />
                  ) : (
                    <LanguageCard
                      key={`${datasetKey}-${phraseIndex}`}
                      item={currentItem}
                      onNext={handleNext}
                      showHint={phraseIndex < 3}
                    />
                  )}

                  <ProgressControls
                    currentPosition={currentIndex}
                    total={transcript.length}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                  />
                </>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App