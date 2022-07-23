import { NextPage } from "next"
import Head from "next/head"
import { Translate } from "../components/Translation"
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Question = {
  question: string,
  answer: string
}

const FAQ:NextPage = () => {
  const intl = useIntl()
  const [open, setOpen] = useState<number|null>(null)

  const handleClick = (i:number|null) => {
    setOpen(i)
  }

  const questions:Question[] = [
    {
      question: 'QUESTION N° 1',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 2',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 3',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 4',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 5',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 6',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 7',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 8',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 9',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
    {
      question: 'QUESTION N° 10',
      answer: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni quo enim optio quidem, ex ipsa dolores facilis, dolore, blanditiis iusto esse. Voluptatum aspernatur a dolores deserunt quibusdam. Voluptatum, minus obcaecati. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non vitae sit, itaque iure cupiditate totam quo reiciendis. Ipsa, quos pariatur dolorum sed sit delectus quae saepe, porro aliquid ullam itaqu'
    },
  ]
  return (
    <>
      <Head>
        <title>{intl.formatMessage({id: 'faq', defaultMessage: 'FAQ'})} | Profepedia</title>
        <meta name="description" content="Encuentra el mejor profesor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-full flex flex-col gap-5">
        <div className="text-center my-2">
          <h1 className="font-semibold text-3xl">
            <Translate label="faq_title"/>
          </h1>
        </div>
        <section className="flex flex-col gap-5 my-3">
          {questions.map((question, i) => (
            <motion.div 
              key={i} 
              onClick={() => handleClick(i === open ? null : i)}
              initial={false}
              className="px-4 py-6 surface-item shadow-md rounded-lg">
              <div className="font-semibold text-lg flex justify-between my-2">
                <div>
                  <span className={i === open ? 'font-bold text-green-600' : ''}>
                    {question.question}
                  </span>
                </div>
                <div>
                  <span>
                    <i className={`bi bi-chevron-${i === open ? 'up' : 'down'}`}/>
                  </span>
                </div>
              </div>
              <div className="px-4">
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
                        transition={{duration: 0.5}}>
                          <motion.div
                            variants={{
                              collapsed: {scaleY: 0},
                              open: {scaleY: 1}
                            }}
                            transition={{duration: 0.7}}>
                              <p>
                                {question.answer}
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
            <Translate label="faq_title"/>
          </h1>
          <div className="my-2 px-2 md:px-0">
            <p className="muted font-medium">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quidem nemo, exercitationem nihil consequatur, minima dolorem sit esse architecto non nostrum cumque fugit eligendi dolorum impedit doloremque numquam iure voluptas.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default FAQ