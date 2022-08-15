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
