import { NextPage } from "next"
import Head from "next/head"
import { Translate } from "../components/Translation"
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';


const FAQ:NextPage = () => {
  const intl = useIntl()
  const [open, setOpen] = useState<number|null>(null)
  const [openTeacher, setOpenTeacher] = useState<number|null>(null)

  const handleClick = (i:number|null) => {
    setOpen(i)
    setOpenTeacher(null)
  }
  const handleClickTeacher = (i:number|null) => {
    setOpenTeacher(i)
    setOpen(null)
  }

  const studentQuestions:number[] = [1,2,3,4,5,6,7]
  const teacherQuestions:number[] = [1,2,3,4,5,6,7,8]

  return (
    <>
      <Head>
        <title>{intl.formatMessage({id: 'faq', defaultMessage: 'FAQ'})} | Profepedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-full flex flex-col gap-5">
        <div className="text-center my-2">
          <h1 className="font-semibold text-3xl">
            <Translate label="faq_title"/>
          </h1>
        </div>
        <section className="flex flex-col gap-5 my-3">
          {studentQuestions.map((x, i) => (
            <motion.div 
              key={i} 
              onClick={() => handleClick(i === open ? null : i)}
              initial={false}
              className="px-4 py-6 surface-item shadow-md rounded-lg">
              <div className="font-semibold text-lg flex justify-between my-2">
                <div>
                  <span className={i === open ? 'font-bold text-green-600' : ''}>
                    {intl.formatMessage({id: `student_question_${i+1}`})}
                  </span>
                </div>
                <div>
                  <span>
                    <i className={`bi bi-chevron-${i === open ? 'up' : 'down'}`}/>
                  </span>
                </div>
              </div>
              <div className="px-4 overflow-clip">
                <AnimatePresence initial={false}>
                  {
                    i === open && (
                      <motion.article
                        key={`ans_${i}`}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open:{opacity: 1, height: "auto"},
                          collapsed:{opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.2}}>
                          <motion.div
                            transition={{duration: 0.7}}>
                              <p>
                                {intl.formatMessage({id: `student_answer_${i+1}`},{bold:<b>Profepedia</b>,br:<br/>})}
                              </p>
                          </motion.div>
                      </motion.article>
                    )
                  }
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </section>
        <div className="text-center my-2">
          <h1 className="font-semibold text-3xl">
            <Translate label="faq_title_2"/>
          </h1>
        </div>
        <section className="flex flex-col gap-5 my-3">
          {teacherQuestions.map((x, i) => (
            <motion.div 
              key={i} 
              onClick={() => handleClickTeacher(i === openTeacher ? null : i)}
              initial={false}
              className="px-4 py-6 surface-item shadow-md rounded-lg">
              <div className="font-semibold text-lg flex justify-between my-2">
                <div>
                  <span className={i === openTeacher ? 'font-bold text-green-600' : ''}>
                    {intl.formatMessage({id: `teacher_question_${i+1}`})}
                  </span>
                </div>
                <div>
                  <span>
                    <i className={`bi bi-chevron-${i === openTeacher ? 'up' : 'down'}`}/>
                  </span>
                </div>
              </div>
              <div className="px-4 overflow-clip">
                <AnimatePresence initial={false}>
                  {
                    i === openTeacher && (
                      <motion.article
                        key={`ans_${i}`}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open:{opacity: 1, height: "auto"},
                          collapsed:{opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.2}}>
                          <motion.div
                            transition={{duration: 0.7}}>
                              <p>
                                {intl.formatMessage({id: `teacher_answer_${i+1}`}, {br: <br/>})}
                              </p>
                          </motion.div>
                      </motion.article>
                    )
                  }
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </section>
        <div className="text-center my-4">
          <h1 className="font-semibold text-3xl">
            <Translate label="faq_title_3"/>
          </h1>
          <div className="my-2 px-2 md:px-0">
            <p className="muted font-medium">
              {intl.formatMessage({id: "faq_paragraph_3"}, {contact: <Link href="/contacto"><a className="text-success hover:text-success">{intl.formatMessage({id: "contact_page"})}</a></Link>})}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default FAQ