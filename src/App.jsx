import {
  Box,
  Button,
  ChakraProvider,
  Container,
  defaultSystem,
  HStack,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EmptyState from './components/EmptyState'
import HomeLayout from './components/HomeLayout'
import LanguageSelector from './components/LanguageSelector'
import LearningCard from './components/LearningCard'
import LoadingState from './components/LoadingState'
import ProgressControls from './components/ProgressControls'
import RegularVerbView from './components/RegularVerbView'
import SetCompletionCard from './components/SetCompletionCard'
import SetIntroCard from './components/SetIntroCard'
import SerEstarView from './components/SerEstarView'
import IrregularVerbView from './components/IrregularVerbView'
import { datasetLoaders } from './data/datasets'
import { readProgress, writeProgress } from './storage'

const progressStorageKeyPrefix =
  'language-builder-current-index-'

function App() {
  const [language, setLanguage] = useState('Spanish')
  const [datasetKey, setDatasetKey] = useState(null)
  const [loadedDataset, setLoadedDataset] = useState({
    key: null,
    transcript: null,
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  const transcript =
    loadedDataset.key === datasetKey
      ? loadedDataset.transcript
      : null

  const items = transcript ? transcript.slice(1) : []
  const totalItems = items.length
  const lastPosition = totalItems + 1
  const currentItem = items[currentIndex - 1]

  const handleStart = () => {
    setCurrentIndex(0)
  }

  const handleNext = () => {
    setCurrentIndex((current) =>
      Math.min(current + 1, lastPosition),
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((current) =>
      Math.max(current - 1, 0),
    )
  }

  const handleHome = () => {
    setDatasetKey(null)
  }

  const handleSelect = (key) => {
    setDatasetKey(key)
  }

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage)
    setDatasetKey(null)
  }

  useEffect(() => {
    if (!datasetKey) return undefined

    let cancelled = false

    datasetLoaders[datasetKey]().then(({ default: transcript }) => {
      if (cancelled) return

      setLoadedDataset({
        key: datasetKey,
        transcript,
      })

      const progressStorageKey =
        `${progressStorageKeyPrefix}${datasetKey}`

      const savedIndex = readProgress(progressStorageKey)

      setCurrentIndex(
        Math.min(Math.max(savedIndex, 0), transcript.length),
      )
    })

    return () => {
      cancelled = true
    }
  }, [datasetKey])

  useEffect(() => {
    if (loadedDataset.key !== datasetKey) return

    writeProgress(
      `${progressStorageKeyPrefix}${datasetKey}`,
      currentIndex,
    )
  }, [currentIndex, datasetKey, loadedDataset.key])

  let content

  if (!datasetKey) {
    content = (
      <HomeLayout
        language={language}
        onSelect={handleSelect}
      />
    )
  } else if (!transcript) {
    content = <LoadingState />
  } else {
    const intro = transcript[0]

  if (intro.view === 'verb-list') {
    content = (
      <RegularVerbView
        verbs={transcript.slice(1)}
      />
    )
  } else if (intro.view === 'irregular-verb-list') {
    content = (
      <IrregularVerbView
        verbs={transcript.slice(1)}
      />
    )
  } else if (intro.view === 'ser-estar') {
    content = (
      <SerEstarView
        verbs={transcript.slice(1)}
      />
    )
  } else {
      content = totalItems === 0 ? (
        <EmptyState
          message="This collection has no learning items yet."
        />
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
      )
    }
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
        <Container maxW="1024px">
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

            <LanguageSelector
              language={language}
              onSelect={handleLanguageChange}
            />
          </HStack>

          <Stack spacing={8} align="center">
            {content}
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
