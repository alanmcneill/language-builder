import {
  Box,
  Button,
  ChakraProvider,
  Container,
  defaultSystem,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EmptyState from './components/EmptyState'
import HomeCard from './components/HomeCard'
import LanguageMenu from './components/LanguageMenu'
import LoadingState from './components/LoadingState'
import LearningCard from './components/LearningCard'
import ProgressControls from './components/ProgressControls'
import ResourcesHomeCard from './components/ResourcesHomeCard'
import SetCompletionCard from './components/SetCompletionCard'
import SetIntroCard from './components/SetIntroCard'
import { datasetLoaders } from './data/datasets'
import { readProgress, writeProgress } from './storage'

const progressStorageKeyPrefix = 'language-builder-current-index-'

function App() {
  const [datasetKey, setDatasetKey] = useState(null)
  const [showResourcesHome, setShowResourcesHome] = useState(false)
  const [loadedDataset, setLoadedDataset] = useState({
    key: null,
    transcript: null,
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleHome = () => {
    setDatasetKey(null)
    setShowResourcesHome(false)
  }

  const handleSelect = (key) => {
    if (key === 'spanish-resources') {
      setShowResourcesHome(true)
      return
    }

    setShowResourcesHome(false)
    setDatasetKey(key)
  }

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

  if (!datasetKey && !showResourcesHome) {
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

              <LanguageMenu onSelect={handleSelect} />
            </HStack>

            <HomeCard onSelect={handleSelect} />
          </Container>
        </Box>
      </ChakraProvider>
    )
  }

  if (showResourcesHome) {
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

              <LanguageMenu onSelect={handleSelect} />
            </HStack>

            <ResourcesHomeCard
              onSelect={handleSelect}
              onBack={handleHome}
            />
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

            <LanguageMenu onSelect={handleSelect} />
          </HStack>

          <Stack spacing={8} align="center">
            <Box w="full" maxW="720px">
              {totalItems === 0 ? (
                <EmptyState message="This collection has no learning items yet." />
              ) : (
                <>
                  {currentIndex === 0 ? (
                    <SetIntroCard
                      item={intro}
                      onNext={handleNext}
                    />
                  ) : currentIndex === lastPosition ? (
                    <SetCompletionCard
                      onPrevious={handlePrevious}
                    />
                  ) : (
                    <LearningCard
                      key={`${datasetKey}-${currentIndex}`}
                      language={intro.language}
                      item={currentItem}
                      direction={intro.direction}
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
