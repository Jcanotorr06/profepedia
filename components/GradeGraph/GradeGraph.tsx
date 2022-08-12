import React from 'react'
import { Grade } from '../../types/grade'
import GradeBar from './GradeBar'

interface Props {
    grades: Grade[]
}

const GradeGraph = ({grades}:Props) => {
  return (
    <div className="flex flex-col gap-4">
        {grades.map((grade, i) => (
            <GradeBar key={i} textLeft={grade.title}textRigth={`${grade.grade}`} ratio={grade.ratio}/>
        ))}
    </div>
  )
}

export default GradeGraph