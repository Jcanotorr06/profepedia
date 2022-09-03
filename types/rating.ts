//RATING SCHEMA
export type rating = {
    id: number,
    created_at: string,
    rating: number,
    dificultad: number,
    wouldTakeAgain: boolean,
    isCredit: boolean,
    useTextbooks: boolean,
    attendanceMandatory: boolean,
    nota: string,
    review: string,
    asignatura: string,
    tag1: string | null,
    tag2: string | null,
    tag3: string | null,
    id_docente: number,
    id_user: string,
    likes: number,
    dislikes: number,
    hidden: boolean,
    isRemote: boolean,
    reported: boolean
}

export type rating_breakdown = {
    rating: number,
    count: number,
    id_docente: number
}

export type likedDisliked = {
    id_rating: number,
    id_usuario: string,
    likeDisliked: "like"|"dislike"
}

export type newRating = {
    id_docente: number,
    id_asignatura: number,
    rating: number,
    dificultad: number,
    wouldTakeAgain: boolean,
    isCredit: boolean,
    useTextbooks: boolean,
    attMandatory: boolean,
    nota: string | null,
    review: string,
    id_tag1: number | null,
    id_tag2: number | null,
    id_tag3: number | null,
    id_user:string,
    hidden: boolean,
    isRemote: boolean
}