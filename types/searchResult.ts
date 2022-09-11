export type searchResult = {
    cant_rating: number,
    cant_wouldTakeAgain: number,
    departamento: string | null | undefined,
    dificultad: number,
    id: number,
    id_universidad: number,
    nombre: string,
    rating: number,
    unidad: string | null | undefined
}

export type searchSuggestion = {
    id: number,
    nombre: string,
    email: string | null | undefined,
    unidad: string | null | undefined,
    departamento: string | null | undefined,
    foto: string,
    email2: string | null | undefined,
    email3: string | null | undefined,
    id_universidad: number
}