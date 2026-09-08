import {
  Box,
  ChakraProvider,
  Container,
  defaultSystem,
  Heading,
  HStack,
  Stack,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EmptyState from './components/EmptyState'
import HomeCard from './components/HomeCard'
import LanguageCard from './components/LanguageCard'
import LanguageMenu from './components/LanguageMenu'
import LoadingState from './components/LoadingState'
import ProgressControls from './components/ProgressControls'
import ResourceCard from './components/ResourceCard'
import SetCompletionCard from './components/SetCompletionCard'
import SetIntroCard from './components/SetIntroCard'
import { datasetLoaders } from './data/datasets'
import { readProgress, writeProgress } from './storage'

const progressStorageKeyPrefix = 'language-builder-current-index-'

function App() {
  const [datasetKey, setDatasetKey] = useState(null)
  const handleHome = () => {
    setDatasetKey(null)
  }
  const [loadedDataset, setLoadedDataset] = useState({
    key: null,
    transcript: null,
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  // Load the selected dataset whenever the language/set changes.
  useEffect(() => {
    if (!datasetKey) return undefined

    let cancelled = false

    datasetLoaders[datasetKey]().then(({ default: loadedTranscript }) => {
      if (cancelled) return

      setLoadedDataset({
        key: datasetKey,
        transcript: loadedTranscript,
      })

      const progressStorageKey = `${progressStorageKeyPrefix}${datasetKey}`
      const savedIndex = readProgress(progressStorageKey)

      setCurrentIndex(
        Math.min(Math.max(savedIndex, 0), loadedTranscript.length),
      )
    })

    return () => {
      cancelled = true
    }
  }, [datasetKey])

  // Save the user's position whenever it changes.
  useEffect(() => {
    if (loadedDataset.key !== datasetKey) return

    writeProgress(
      `${progressStorageKeyPrefix}${datasetKey}`,
      currentIndex,
    )
  }, [currentIndex, datasetKey, loadedDataset.key])

  const transcript =
    loadedDataset.key === datasetKey
      ? loadedDataset.transcript
      : null

  if (!datasetKey) {
    return (
      <ChakraProvider value={defaultSystem}>
        <Box
          minH="100vh"
          bg="gray.800"
          color="whiteAlpha.900"
          py={10}
          className="dark"
        >
          <Container maxW="container.md">
            <HStack justify="space-between" mb={8}>
              <Button
                variant="plain"
                p={0}
                h="auto"
                color="teal.300"
                fontSize="lg"
                fontWeight="bold"
                onClick={handleHome}
              >
                LEXICON
              </Button>
              <LanguageMenu onSelect={setDatasetKey} />
            </HStack>

            <HomeCard onSelect={setDatasetKey} />
          </Container>
        </Box>
      </ChakraProvider>
    )
  }

  if (!transcript) {
    return (
      <ChakraProvider value={defaultSystem}>
        <LoadingState />
      </ChakraProvider>
    )
  }

  // Every dataset now has its intro at index 0.
  const intro = transcript[0]
  const items = transcript.slice(1)

  // currentIndex refers to the user's position in the learning flow.
  const currentItem = items[currentIndex - 1]
  const totalItems = items.length
  const lastPosition = totalItems + 1

  // Resources currently use a different card from language phrases.
  const isResourceDataset = datasetKey === 'spanish-resources'

  const handleStart = () => {
    setCurrentIndex(0)
  }
  const handleNext = () => {
    setCurrentIndex((current) => Math.min(current + 1, lastPosition))
  }
  const handlePrevious = () => {
    setCurrentIndex((current) => Math.max(current - 1, 0))
  }

  return (
    <ChakraProvider value={defaultSystem}>
      <Box
        minH="100vh"
        bg="gray.800"
        color="whiteAlpha.900"
        py={10}
        className="dark"
      >
        <Container maxW="container.md">
          <HStack justify="space-between" mb={8}>
            <Heading as="h1" size="lg" color="teal.300">
              LEXICON
            </Heading>
            <LanguageMenu onSelect={setDatasetKey} />
          </HStack>

          <Stack spacing={8} align="center">
            <Box w="full" maxW="720px">
              {totalItems === 0 ? (
                <EmptyState message="This collection has no learning items yet." />
              ) : (
                <>
                  {/* Introduction */}
                  {currentIndex === 0 ? (
                    <SetIntroCard
                      item={intro}
                      onNext={handleNext}
                    />
                  ) : currentIndex === lastPosition ? (
                    /* Completion screen */
                    <SetCompletionCard
                      onPrevious={handlePrevious}
                    />
                  ) : isResourceDataset ? (
                    /* Resource/vocabulary item */
                    <ResourceCard
                      key={`${datasetKey}-${currentIndex}`}
                      item={currentItem}
                      onNext={handleNext}
                      showHint={currentIndex <= 3}
                    />
                  ) : (
                    /* Normal language phrase */
                    <LanguageCard
                      key={`${datasetKey}-${currentIndex}`}
                      language={intro.language}
                      item={currentItem}
                      onNext={handleNext}
                      showHint={currentIndex <= 3}
                    />
                  )}
                  <ProgressControls
                    currentPosition={currentIndex}
                    total={totalItems}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onStart={handleStart}
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
