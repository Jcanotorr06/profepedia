import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useProfessor, useUser } from '../../context'
import { supabase } from '../../utils/supabaseClient'
import { formatNombre } from '../../utils/utils'
import { Select } from '../Inputs'
import { Loading } from '../Navigation'
import { Translate } from '../Translation'

interface ReviewForm {
    id_asignatura: number,
    rating: number,
    dificultad: number,
    wouldTakeAgain: boolean,
    useTextbooks: boolean,
    attMandatory: boolean,
    nota: string,
    review: string,
    id_tag1: number,
    id_tag2: number,
    id_tag3: number,
    isRemote: boolean
}

const ReviewModal = () => {
    const { 
        data, loadingReviewData, tags, courses,
        getReviewData 
    } = useProfessor()
    const { user } = useUser()

    useEffect(() => {
        if(!tags[0] && !courses[0] && data && !loadingReviewData){
            getReviewData(data.id)
        }
    }, [data, courses, tags, loadingReviewData])

    const {register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting, dirtyFields, isValidating }} = useForm<ReviewForm>()

    const handleReview = (req:ReviewForm) => {
        if(data && req && user){
            const payload = {
                id_docente: data.id,
                id_asignatura: req.id_asignatura,
                rating: req.rating,
                dificultad: req.dificultad,
                wouldTakeAgain: req.wouldTakeAgain,
                isCredit: false,
                useTextbooks: req.useTextbooks,
                attMandatory: req.attMandatory,
                nota: req.nota,
                review: req.review,
                id_tag1: req.id_tag1,
                id_tag2: req.id_tag2,
                id_tag3: req.id_tag3,
                id_user: user.id,
                hidden: false,
                isRemote: req.isRemote
            }
            console.log(payload)
            console.log('DIRTY: ',isDirty, 'DIRTY FIERLDS: ',dirtyFields, 'ERRORS: ',errors, 'isValid: ',isValid)
        }
    }

    const gradeOptions = [
        {
            label: "A",
            value: "A"
        },
        {
            label: "B",
            value: "B"
        },
        {
            label: "C",
            value: "C"
        },
        {
            label: "D",
            value: "D"
        },
        {
            label: "F",
            value: "F"
        },
        {
            label: "R",
            value: "R"
        },
        {
            label: "N",
            value: "N"
        },
    ]

    return (
    <Loading active={loadingReviewData} className="w-full h-full rounded-xl">
        <div className="flex flex-col p-2 select-none">
            <header className="p-1">
                <h1 className='text-lg sm:text-xl md:text-2xl font-medium'>
                    <Translate label="you_are_rating" values={{name: <span className="font-black">{data && formatNombre(data.nombre)}</span>}}/> 
                </h1>
            </header>
            <form onSubmit={handleSubmit(handleReview)} className="p-1 my-2 form-control gap-3 w-full">
                <div className="form-control">
                    <label htmlFor="id_asignatura" className="label-text">Asignatura <span className="text-red-500">*</span></label>
                    <select {...register("id_asignatura", {required: "this is required", valueAsNumber:true, min: 0})} className="select select-bordered">
                        <option selected disabled hidden value={-1}>Select a subject</option>
                        {courses && courses.map((course, i) => (
                            <option key={i} value={course.id_asignatura}>{course.asignatura} | {course.grupo}</option>
                        ))}
                    </select>
                    {errors.id_asignatura && dirtyFields.id_asignatura && 
                        <div className='muted font-bold'>
                            <small>{errors.id_asignatura.message}</small>
                        </div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="nota" className="label-text">Nota</label>
                    <select {...register("nota", {required: false})} className="select select-bordered">
                        <option selected disabled hidden value={-1}>Select a grade</option>
                        {gradeOptions.map((opt, i) => (
                            <option value={opt.value} key={i}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="rating" className="label-text">Rating</label>
                    <div className="rating rating-lg gap-1">
                        <input type="radio" {...register("rating", {required: 'must select one', valueAsNumber: true})} value={1} className="mask mask-star-2 bg-red-400" />
                        <input type="radio" {...register("rating", {required: 'must select one', valueAsNumber: true})} value={2} className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" {...register("rating", {required: 'must select one', valueAsNumber: true})} value={3} className="mask mask-star-2 bg-yellow-400" />
                        <input type="radio" {...register("rating", {required: 'must select one', valueAsNumber: true})} value={4} className="mask mask-star-2 bg-lime-400" />
                        <input type="radio" {...register("rating", {required: 'must select one', valueAsNumber: true})} value={5} className="mask mask-star-2 bg-green-400" />
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor='review'>Review<span className="text-red-500">*</span> </label>
                    <textarea 
                        cols={30} 
                        rows={5}
                        {...register("review", {required: 'this is required', maxLength: 250, minLength: 10})} 
                        className="textarea textarea-bordered rounded-md" 
                    >

                        </textarea>
                    {errors.review && dirtyFields.review && 
                        <div className='muted font-bold'>
                            <small className="text-red-500">{errors.review.message}</small>
                        </div>
                    }
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-3">
                    <label htmlFor="isRemote" className="label cursor-pointer border-b xl:gap-0 gap-4 px-2 hover:font-bold transition-all">
                        <span className="label-text">Remote: </span>
                        <input type="checkbox" className="checkbox" {...register("isRemote")} />
                    </label>
                    <label htmlFor="wouldTakeAgain" className="label cursor-pointer border-b xl:gap-0 gap-4 px-2 hover:font-bold transition-all">
                        <span className="label-text">Would Take Again: </span>
                        <input type="checkbox" className="checkbox" {...register("wouldTakeAgain")} />
                    </label>
                    <label htmlFor="useTextbooks" className="label cursor-pointer border-b xl:gap-0 gap-4 px-2 hover:font-bold transition-all">
                        <span className="label-text">Use Textbooks: </span>
                        <input type="checkbox" className="checkbox" {...register("useTextbooks")} />
                    </label>
                    <label htmlFor="attMandatory" className="label cursor-pointer border-b xl:gap-0 gap-4 px-2 hover:font-bold transition-all">
                        <span className="label-text">Attendance Mandatory: </span>
                        <input type="checkbox" className="checkbox" {...register("attMandatory")} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="submit" className="btn btn-md btn-primary" disabled={false} />
                </div>
            </form>
        </div>
    </Loading>
    )
}

export default ReviewModal