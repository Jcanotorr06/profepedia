import Image from "next/image"
import Link from "next/link"
import { HTMLMotionProps, motion, SVGMotionProps } from 'framer-motion'
import { IconButton } from "../Buttons"
import { useState } from 'react';
import { Translate } from "../Translation";

const MobileNavBar = () => {
  
  const [show, setShow] = useState<boolean>(false)

  const liVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.1
      }
    },
    open: {
      opacity: 1,
      y: "0%",
    }
  }

  return (
    <nav className="bg-transparent w-full top-0 mb-4 justify-between items-center align-middle py-2 px-4 border-b flex lg:hidden">
      <div className="relative z-40">
        <Link href="/">
          <a>
            <Image src="/logo.svg" height={30} width={30} alt="logo"/>
          </a>
        </Link>
      </div>
      <motion.div
        initial={"closed"}
        animate={show ? "open" : "closed"}
        className="relative"
      >
        <button onClick={() => setShow(!show)} className="z-40 relative bg-transparent">
          <svg width="23" height="23" viewBox="0 0 23 23">
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="hsl(0, 0%, 18%)"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" }
              }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="hsl(0, 0%, 18%)"
              strokeLinecap="round"
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="hsl(0, 0%, 18%)"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" }
              }}
            />
          </svg>
        </button>
        <motion.div
        variants={{
          closed: {
            x: "100%",
            transition: {
              type: 'tween'
            }
          },
          open: {
            x: "0%",
            transition: {
              type: 'tween'
            }
          }
        }} 
        className="fixed top-0 left-0 h-screen w-screen text-center bg-white z-20 pt-16">
            <motion.ul
            variants={{
              closed: {
                transition: {
                  staggerChildren: 0.6,
                  staggerDirection: -1
                }
              },
              open: {
                transition: {
                  delayChildren: 0.5,
                  staggerChildren: 0.5
                }
              }
            }}
            className="flex flex-col items-center w-full gap-10">
              <motion.li
              key={"key_1"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Translate label="home" className="text-2xl font-medium"/>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_2"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Translate label="home" className="text-2xl font-medium"/>
                </motion.div>
              </motion.li>
              <motion.li
              key={"key_3"}
                whileTap={{scale: 0.95}}
              >
                <motion.div
                variants={liVariants}>
                  <Translate label="home" className="text-2xl font-medium"/>
                </motion.div>
              </motion.li>
            </motion.ul>
        </motion.div>
      </motion.div>
    </nav>
  )
}

export default MobileNavBar