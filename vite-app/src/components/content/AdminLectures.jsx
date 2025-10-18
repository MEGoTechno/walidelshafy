import { memo, useEffect, useState } from 'react'
import Grid from '../../style/vanilla/Grid'
import { Alert, } from '@mui/material'
import TitleWithDividers from '../ui/TitleWithDividers'

import { useChangeLectureIndexMutation, useLazyGetAllLecturesQuery } from '../../toolkit/apis/lecturesApi'
import useLazyGetData from "../../hooks/useLazyGetData"
import AdminCardLecture from './AdminCardLecture'

import LoaderWithText from '../../style/mui/loaders/LoaderWithText'
import { lang } from '../../settings/constants/arlang'
import { OutLinedHoverBtn } from '../../style/buttonsStyles'
import ModalStyled from '../../style/mui/styled/ModalStyled'
import LectureCreate from './LectureCreate'

import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import usePostData from '../../hooks/usePostData'
// import Loader from '../../style/mui/loaders/Loader'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

function AdminLectures({ course, unit, grade, refetchLectures, setLecturesCount }) {

  const [open, setOpen] = useState(false)
  const [lectures, setLectures] = useState([])

  const [getData, status] = useLazyGetAllLecturesQuery()
  const [getLectures] = useLazyGetData(getData)

  const [sendData, { isLoading }] = useChangeLectureIndexMutation()
  const [changeLectureIndex] = usePostData(sendData)

  useEffect(() => {
    const trigger = async () => {
      const res = await getLectures({ course }, false)
      setLectures(res.lectures)
      if (setLecturesCount) {
        setLecturesCount(res.lectures?.length || 'loading')
      }
    }
    trigger()
  }, [course, refetchLectures])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  if (status.isLoading) return <LoaderWithText />

  const handleDragEnd = async (event) => {
    try {
      const { active, over } = event
      if (!over || active.id === over.id) return

      await changeLectureIndex({
        id: lectures.find(lec => lec._id === active.id)._id,
        targetId: lectures.find(lec => lec._id === over.id)._id,
      })

      setLectures((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id)
        const newIndex = items.findIndex((item) => item._id === over.id)
        return arrayMove(items.map(item => {
          if (item._id === active.id) {
            return { ...item, oldIndex: 1 + oldIndex, newIndex: 1 + newIndex }
          }
          return item
        }), oldIndex, newIndex)
      })

    } catch (error) {
      console.log('error from change order ==>', error)
    }
  }



  return (
    <div>
      <TitleWithDividers title={lang.LECTURES} />

      {status.isSuccess && lectures.length === 0 && (
        <Alert variant="filled" severity="warning" sx={{ justifyContent: 'center', my: '16px' }}>
          {lang.NO_LECTURES_IN_THIS_COURSE}
        </Alert>
      )}

      <OutLinedHoverBtn disabled={!grade} sx={{ m: '16px auto', width: '100%' }} onClick={() => setOpen(true)} >{lang.ADD_LECTURE}</OutLinedHoverBtn>


      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {lectures?.length && (

          <Grid gap='10px' sx={{ position: 'relative' }}>
            {isLoading && <FlexColumn sx={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%', bgcolor: '#00000030', zIndex: 5,
              padding: '16px'
            }}>
              <LoaderWithText variant='filled' text={'يتم تغيير ترتيب المحاضرات'} />
            </FlexColumn>}

            <SortableContext items={lectures.map(l => l._id)}>
              {/*  strategy={verticalListSortingStrategy} */}
              {lectures && lectures?.map((lecture, i) => {
                return <AdminCardLecture key={lecture._id} i={i} courseId={course} lecture={lecture} setLectures={setLectures} />
              })}
            </SortableContext>
          </Grid>
        )}

      </DndContext>


      <ModalStyled open={open} setOpen={setOpen} >
        {(unit && grade && course) ?
          <LectureCreate unit={unit} grade={grade} course={course} setLectures={setLectures} />
          : <Alert severity='warning'>من فضلك اختر وحده !</Alert>
        }
      </ModalStyled>
    </div>
  )
}

// lecture => vids, files, exams
export default memo(AdminLectures)
