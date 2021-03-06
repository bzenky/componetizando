import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { api } from '../services/api'

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

interface GenreStateProps {
  children: ReactNode
}

interface GenreContextProps {
  genres: GenreResponseProps[]
  selectedGenreId: number
  selectedGenre: GenreResponseProps
  handleClickButton: (id: number) => void
  movies: MovieProps[]
}

export const GenreContext = createContext<GenreContextProps>({} as GenreContextProps)

export function GenreState({ children }: GenreStateProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  }, [])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps)

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data)
    })

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  return (
    <>
      <GenreContext.Provider value={{ genres, selectedGenreId, selectedGenre, handleClickButton, movies }}>
        {children}
      </GenreContext.Provider>
    </>
  )
}

export function useGenreContext() {
  const context = useContext(GenreContext)

  return context
}