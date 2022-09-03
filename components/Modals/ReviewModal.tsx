import React, { FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useModal, useProfessor, useUser } from '../../context'
import { newRating } from '../../types/rating'
import { supabase } from '../../utils/supabaseClient'
import { formatNombre } from '../../utils/utils'
import { Select } from '../Inputs'
import { Loading } from '../Navigation'
import Load from 'react-loading'
import { Translate } from '../Translation'
import { toast } from 'react-toastify'
import Link from 'next/link'

interface ReviewForm {
    id_asignatura: number,
    rating: number,
    dificultad: number,
    nota: string,
    review: string,
}

interface TagsValues {
    tag1: number | null,
    tag2: number | null,
    tag3: number | null,
    lastSelected: 1 | 2 | 3 | undefined
}

const ReviewModal = () => {
    const { 
        data, loadingReviewData, tags, courses,
        getReviewData, sendReview 
    } = useProfessor()
    const intl = useIntl()
    const { user } = useUser()
    const { openModal, closeModal } = useModal()

    const {register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting, dirtyFields, isValidating }} = useForm<ReviewForm>({mode: 'all'})

    const [ratingValue, setRatingValue] = useState<number>(3)
    const [difficultyValue, setDifficultyValue] = useState<number>(3)
    const [tagsValues, setTagsValues] = useState<TagsValues>({tag1: null, tag2: null, tag3: null, lastSelected: undefined})
    const [isRemote, setIsRemote] = useState<boolean>(false)
    const [attMandatory, setAttMandatory] = useState<boolean>(false)
    const [useTextbooks, setUseTextbooks] = useState<boolean>(false)
    const [wouldTakeAgain, setWouldTakeAgain] = useState<boolean>(false)
    const [isCredit, setIsCredit] = useState<boolean>(false)
    const [idAsignatura, setIdAsignatura] = useState<number|undefined>(undefined)
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [reviewLength, setReviewLength] = useState<number>(0)
    const [loadingSendReview, setLoadingSendReview] = useState<boolean>(false)
    const five = [1,2,3,4,5]

    useEffect(() => {
        if(!tags[0] && !courses[0] && data && !loadingReviewData){
            getReviewData(data.id)
        }
    }, [data, courses, tags, loadingReviewData])

    const handleRatingChange = (e:FormEvent<HTMLInputElement>) => {
        setRatingValue(parseInt(e.currentTarget.value))
    }
    const handleDifficultyChange = (e:FormEvent<HTMLInputElement>) => {
        setDifficultyValue(parseInt(e.currentTarget.value))
    }
    const handleSubjectChange = (e:FormEvent<HTMLSelectElement>) => {
        setIdAsignatura(parseInt(e.currentTarget.value))
    }

    const handleTagSelect = (tagId:number) => {
        if(tagsValues.lastSelected){
            if(tagsValues.lastSelected === 1){
                setTagsValues(v => ({...v, tag2: tagId, lastSelected: 2}))
            }
            else if(tagsValues.lastSelected === 2) {
                setTagsValues(v => ({...v, tag3: tagId, lastSelected: 3}))
            }
            else{
                setTagsValues(v => ({...v, tag1: tagId, lastSelected: 1}))
            }
        }else{
            setTagsValues(v => ({...v, tag1: tagId, lastSelected: 1}))
        }
    }

    const handleSetRemote = (value:boolean) => {
        setIsRemote(value)
    }

    const handleReviewLength = (e:FormEvent<HTMLTextAreaElement>) => {
        setReviewLength(e.currentTarget.value.length)
    }

    const handleReview = async (req:ReviewForm) => {
        if(data && req && user && idAsignatura){
            setLoadingSendReview(true)
            const payload:newRating = {
                id_docente: data.id,
                id_asignatura: idAsignatura,
                rating: ratingValue,
                dificultad: difficultyValue,
                wouldTakeAgain: wouldTakeAgain,
                isCredit: isCredit,
                useTextbooks: useTextbooks,
                attMandatory: attMandatory,
                nota: req.nota === '-1' ? null : req.nota,
                review: req.review,
                id_tag1: tagsValues.tag1,
                id_tag2: tagsValues.tag2,
                id_tag3: tagsValues.tag3,
                id_user: user.id,
                hidden: false,
                isRemote: isRemote
            }
            
            console.log(payload, isValid)
            let res = await sendReview(payload, data.id)
            if(res){            
                openModal("REVIEW_SUCCESS")
            }else{
                toast.error("There was an error")
            }
            setLoadingSendReview(false)
        }
    }

    const handleLink = () => {
        closeModal()
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
            <div className="divider"/>
            <section className="flex flex-col p-2 select-none my-3">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4">
                    <span className="text-success">●</span>&nbsp;<Translate label="things_to_remember"/>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 justify-center gap-6 lg:gap-20 lg:text-center">
                    <article className="flex items-center gap-6 lg:gap-0 lg:flex-col bg-amber-100 rounded-md justify-around p-4 lg:p-8">
                        <div className="text-5xl text-center my-2 w-1/4 lg:w-auto">
                            <div className="hidden lg:block">
                                <h6 className="text-sm lg:text-base mb-2 text-center"><Translate label="be_honest"/></h6>
                            </div>
                            <i className="bi bi-clipboard-check"/>
                        </div>
                        <div className="my-4">
                            <h6 className="lg:hidden"><Translate label="be_honest"/></h6>
                            <p className="font-light text-xs md:text-sm">
                                {intl.formatMessage({id: "be_honest_paragraph", defaultMessage: "be_honest_paragraph"})}
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center gap-6 lg:gap-0 lg:flex-col bg-amber-100 rounded-md justify-around p-4 lg:p-8">
                        <div className="text-5xl text-center my-2 w-1/4 lg:w-auto">
                            <div className="hidden lg:block">
                                <h6 className="text-sm lg:text-base mb-2 text-center"><Translate label="be_nice"/></h6>
                            </div>
                            <i className="bi bi-chat-square-heart"/>
                        </div>
                        <div className="my-4">
                            <h6 className="lg:hidden"><Translate label="be_nice"/></h6>
                            <p className="font-light text-xs md:text-sm">
                                {intl.formatMessage({id: "be_nice_paragraph", defaultMessage: "be_nice_paragraph"})}
                            </p>
                        </div>
                    </article>
                    <article className="flex items-center gap-6 lg:gap-0 lg:flex-col bg-amber-100 rounded-md justify-around p-4 lg:p-8">
                        <div className="text-5xl text-center my-2 w-1/4 lg:w-auto">
                            <div className="hidden lg:block">
                                <h6 className="text-sm lg:text-base mb-2 text-center"><Translate label="be_safe"/></h6>
                            </div>
                            <i className="bi bi-shield-lock"/>
                        </div>
                        <div className="my-4">
                            <h6 className="lg:hidden"><Translate label="be_safe"/></h6>
                            <p className="font-light text-xs md:text-sm">
                                {intl.formatMessage({id: "be_safe_paragraph", defaultMessage: "be_safe_paragraph"})}
                            </p>
                        </div>
                    </article>
                </div>
                <div className="my-2">
                    <p className="text-sm muted">
                        <span className="text-red-500">*</span>
                        {intl.formatMessage({id: "compliance_disclaimer", defaultMessage: "compliance_disclaimer"})}
                    </p>
                </div>
            </section>
            <div className="divider"/>
            <form onSubmit={handleSubmit(handleReview)} className="p-1 my-2 form-control gap-3 w-full">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4">
                    <span className="text-success">●&nbsp;</span>{intl.formatMessage({id: "review_first"})}
                </h2>
                <div className="form-control mb-8">
                    <label htmlFor="id_asignatura" className="label-text text-lg font-semibold mb-2">
                        1.&nbsp;
                        <span className="text-red-500">*</span>
                        {intl.formatMessage({id: "review_course_question"})}
                    </label>
                    <select {...register("id_asignatura", {required: 'this_field_is_required',valueAsNumber:true, min: 0})} className="select select-bordered" onChange={handleSubjectChange}>
                        <option selected disabled hidden value={-1}>{intl.formatMessage({id: "review_course_placeholder"})}</option>
                        {courses && courses.map((course, i) => (
                            <option key={i} value={course.id_asignatura}>{course.asignatura} | {course.grupo}</option>
                        ))}
                    </select>
                    <p className="text-sm mt-2">
                        {/*Select the class name / number for the class that you took with this professor.*/}
                        {intl.formatMessage({id: "review_course_description"})}
                    </p>
                    {errors.id_asignatura && dirtyFields.id_asignatura && 
                        <div className='muted font-bold'>
                            <small>
                                {intl.formatMessage({id: errors.id_asignatura.message})}
                            </small>
                        </div>
                    }
                </div>
                <div className="form-control mb-8">
                    <h3 className="label-text text-lg font-semibold mb-2">
                        2.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* Did you take this class online or in person? */}
                        {intl.formatMessage({id: "review_remote_question"})}
                    </h3>
                    <div className="flex gap-2">
                        <button type="button" className={`btn rounded-full px-10 text-xs ${isRemote ? 'btn-success' : 'btn-outline'}`} onClick={() => handleSetRemote(true)}>
                            {intl.formatMessage({id: "online", defaultMessage: "Online"})}
                        </button>
                        <button type="button" className={`btn rounded-full px-10 text-xs ${!isRemote ? 'btn-success' : 'btn-outline'}`} onClick={() => handleSetRemote(false)}>
                            {intl.formatMessage({id: "in_person", defaultMessage: "In Person"})}
                        </button>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="nota" className="label-text text-lg font-semibold mb-2">
                        3.&nbsp;
                        {/* What grade did you receive in this class? */}
                        {intl.formatMessage({id: "review_grade_question"})}
                    </label>
                    <select {...register("nota")} className="select select-bordered">
                        <option selected disabled hidden value={-1}>{intl.formatMessage({id: "review_grade_placeholder"})}</option>
                        {gradeOptions.map((opt, i) => (
                            <option value={opt.value} key={i}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div className="divider"/>
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4">
                    <span className="text-success">●&nbsp;</span>{intl.formatMessage({id: "review_now"})}
                </h2>
                <div className="form-control mb-8">
                    <label htmlFor="rating" className="label-text text-lg font-semibold mb-2">
                        4.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* On a scale of 1 to 5, What is your overall rating for this professor? */}
                        {intl.formatMessage({id: "review_rating_question"})}
                    </label>
                    <div className="rating rating-lg gap-1">
                        {five.map(i => (
                            <label key={i} className="label" htmlFor={`rating_${i}`}>
                                <div className={`btn px-6 sm:px-10 md:px-12 lg:px-16 rounded-full ${ratingValue === i ? 'btn-success' : 'btn-outline'}`}>{i}</div>
                                <input type="radio" id={`rating_${i}`} {...register("rating", {valueAsNumber: true})} onChange={handleRatingChange} value={i} className="hidden" />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-control mb-8">
                    <label htmlFor="rating" className="label-text text-lg font-semibold mb-2">
                        5.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* On a scale of 1 to 5, How difficult were this professor&apos;s classes? */}
                        {intl.formatMessage({id: "review_difficulty_question"})}
                    </label>
                    <div className="rating rating-lg gap-1">
                        {five.map(i => (
                            <label key={i} className="label" htmlFor={`dificultad_${i}`}>
                                <div className={`btn px-6 sm:px-10 md:px-12 lg:px-16 rounded-full ${difficultyValue === i ? 'btn-success' : 'btn-outline'}`}>{i}</div>
                                <input type="radio" id={`dificultad_${i}`} {...register("dificultad", {valueAsNumber: true})} onChange={handleDifficultyChange} value={i} className="hidden" />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-comtrol">
                    <label className="label-text text-lg font-semibold mb-2">
                        6.&nbsp;
                        {/* Pick up to 3 tags that you feel describe this professor best. */}
                        {intl.formatMessage({id: "review_tags_question"})}
                    </label>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        {tags && tags.map(tag => (
                            <div key={tag.id} className="text-2xs md:text-sm">
                                <label className="label" htmlFor={tag.tag}>
                                    <div 
                                        className={`btn px-10 ${(tagsValues.tag1 === tag.id || tagsValues.tag2 === tag.id || tagsValues.tag3 === tag.id) ? 'btn-success' : 'btn-outline'}`} 
                                        onClick={() => handleTagSelect(tag.id)}>
                                            {intl.formatMessage({id: tag.tag, defaultMessage: tag.tag})}
                                        </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="divider"/>
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4">
                    <span className="text-success">●&nbsp;</span>{intl.formatMessage({id: "review_next"})}
                </h2>
                <div className="form-control mb-8">
                    <label htmlFor="review" className="label-text text-lg font-semibold mb-2">
                        6.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* Tell us about your experience with this professor. */}
                        {intl.formatMessage({id: "review_review_question"})}
                    </label>
                    <textarea 
                        cols={30} 
                        rows={5}
                        {...register("review", {required: "this_field_is_required",maxLength: {value: 250, message: 'review_max_length'}, minLength: {value: 10, message: 'review_min_length'}})} 
                        className={`textarea rounded-md ${(errors.review && dirtyFields.review) ? 'textarea-error' : 'textarea-bordered'}`}
                        placeholder={intl.formatMessage({id: "review_review_placeholder"})}
                        maxLength={250}
                        onChange={handleReviewLength}
                    >
                        </textarea>
                    <span>{reviewLength}/250</span>
                    {errors.review && dirtyFields.review && 
                        <div className='muted font-bold'>
                            <small className="text-red-500">{intl.formatMessage({id: errors.review.message})}</small>
                        </div>
                    }
                </div>
                <div className="form-control mb-8">
                    <h3 className="label-text text-lg font-semibold mb-2">
                        7.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* Would you take a class with this professor again? */}
                        {intl.formatMessage({id: "review_again_question"})}
                    </h3>
                    <div className="flex gap-2">
                        <button type="button" className={`btn rounded-full px-10 text-xs ${wouldTakeAgain ? 'btn-success' : 'btn-outline'}`} onClick={() => setWouldTakeAgain(true)}>
                            {intl.formatMessage({id: "yes", defaultMessage: "Yes"})}
                        </button>
                        <button type="button" className={`btn rounded-full px-10 text-xs ${!wouldTakeAgain ? 'btn-success' : 'btn-outline'}`} onClick={() => setWouldTakeAgain(false)}>
                            {intl.formatMessage({id: "no", defaultMessage: "No"})}
                        </button>
                    </div>
                </div>
                <div className="form-control mb-8">
                    <h3 className="label-text text-lg font-semibold mb-2">
                        8.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* Was the use of textbooks important for this class? */}
                        {intl.formatMessage({id: "review_textbooks_question"})}
                    </h3>
                    <div className="flex gap-2">
                        <button type="button" className={`btn rounded-full px-10 text-xs ${useTextbooks ? 'btn-success' : 'btn-outline'}`} onClick={() => setUseTextbooks(true)}>
                            {intl.formatMessage({id: "yes", defaultMessage: "Yes"})}
                        </button>
                        <button type="button" className={`btn rounded-full px-10 text-xs ${!useTextbooks ? 'btn-success' : 'btn-outline'}`} onClick={() => setUseTextbooks(false)}>
                            {intl.formatMessage({id: "no", defaultMessage: "No"})}
                        </button>
                    </div>
                </div>
                <div className="form-control mb-8">
                    <h3 className="label-text text-lg font-semibold mb-2">
                        9.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* Was attendance important for this class? */}
                        {intl.formatMessage({id: "review_attendance_question"})}
                    </h3>
                    <div className="flex gap-2">
                        <button type="button" className={`btn rounded-full px-10 text-xs ${attMandatory ? 'btn-success' : 'btn-outline'}`} onClick={() => setAttMandatory(true)}>
                            {intl.formatMessage({id: "yes", defaultMessage: "Yes"})}
                        </button>
                        <button type="button" className={`btn rounded-full px-10 text-xs ${!attMandatory ? 'btn-success' : 'btn-outline'}`} onClick={() => setAttMandatory(false)}>
                            {intl.formatMessage({id: "no", defaultMessage: "No"})}
                        </button>
                    </div>
                </div>
                <div className="form-control mb-8">
                    <h3 className="label-text text-lg font-semibold mb-2">
                        10.&nbsp;
                        <span className="text-red-500">*</span>
                        {/* Was this class obligatory? */}
                        {intl.formatMessage({id: "review_credit_question"})}
                    </h3>
                    <div className="flex gap-2">
                        <button type="button" className={`btn rounded-full px-10 text-xs ${isCredit ? 'btn-success' : 'btn-outline'}`} onClick={() => setIsCredit(true)}>
                            {intl.formatMessage({id: "yes", defaultMessage: "Yes"})}
                        </button>
                        <button type="button" className={`btn rounded-full px-10 text-xs ${!isCredit ? 'btn-success' : 'btn-outline'}`} onClick={() => setIsCredit(false)}>
                            {intl.formatMessage({id: "no", defaultMessage: "No"})}
                        </button>
                    </div>
                </div>
                <div className="divider"/>
                <div className="form-control">
                <div className="flex items-center gap-4 cursor-pointer mb-4">
                    <input type="checkbox" className="checkbox" checked={acceptTerms} onChange={()=>setAcceptTerms(t=>!t)} />
                    <span className="label-text"><span className="text-red-500 text-2xs">✱ </span>
                        <Translate label="review_terms_and_conditions" values={{link: <Link href="/terminos"><a onClick={() => handleLink()}><Translate label="terms_and_conditions"/></a></Link>}}/>
                    </span> 
                </div>
                </div>
                <div className="form-control items-center">
                    <button type="submit" className="button btn btn-md btn-success px-16 rounded-full" disabled={!ratingValue || !difficultyValue || !idAsignatura || !acceptTerms || reviewLength<10 || reviewLength>250 || loadingSendReview}>{loadingSendReview && <><Load type="spin" color="#000" width={20} height={20}/>&nbsp;</>}Submit</button>
                    {/* <input type="submit" className="button btn btn-md btn-success px-16 rounded-full" disabled={!ratingValue || !difficultyValue || !idAsignatura || !acceptTerms} value="Submit"/> */}
                </div>
            </form>
        </div>
    </Loading>
    )
}

export default ReviewModal