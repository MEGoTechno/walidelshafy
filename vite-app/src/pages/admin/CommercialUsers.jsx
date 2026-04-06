import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { useGridApiRef } from '@mui/x-data-grid'
import { useNavigate, useSearchParams } from 'react-router-dom';

import { user_roles } from '../../settings/constants/roles'
import governments from '../../settings/constants/governments'

import { lang } from '../../settings/constants/arlang'
import { getDateWithTime, getFullDate } from '../../settings/constants/dateConstants'

import Section from "../../style/mui/styled/Section"
import ModalStyled from '../../style/mui/styled/ModalStyled'
import { FilledHoverBtn } from '../../style/buttonsStyles'
import { FlexColumn } from '../../style/mui/styled/Flexbox'

import { makeArrWithValueAndLabel } from '../../tools/fcs/MakeArray'
import MeDatagrid from '../../tools/datagrid/MeDatagrid'

import usePostData from '../../hooks/usePostData'

import CreateUser from '../../components/users/CreateUser'
import TabInfo from '../../components/ui/TabInfo'
import TitleSection from '../../components/ui/TitleSection'
import UserAvatar from '../../components/users/UserAvatar';

import UserShowTable from '../../components/users/UserShowTable';
import useGrades from '../../hooks/useGrades';
import BtnModal from '../../components/ui/BtnModal';
import NotificationsForm from '../../components/notifications/NotificationsForm';
import { useDeleteCommercialMutation, useDeleteManyCommercialMutation, useLazyGetCommercialQuery, useUpdateCommercialMutation } from '../../toolkit/apis/commercialUsers';
// import CreateUser from '../../components/users/CreateUser'

const exportObj = (grades) => ({
    isActive: (row) => {
        if (row.isActive) {
            return 'فعال'
        } else {
            return 'غير فعال'
        }
    },
    wallet: (row) => {
        return row.wallet + ' ' + 'جنيه'
    },
    createdAt: (row) => {
        return getDateWithTime(row.createdAt)
    }
})


function CommercialUsers({ setExcludedUsers, isShowTitle = true, courses, isShowGrades = true, isShowCreate = true, setUsersNumber }) {
    const { grades } = useGrades()

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    const [grade, setGrade] = useState(Number(searchParams.get('grade')) || 0)
    const [open, setOpen] = useState(false)

    //get users
    const [reset, setReset] = useState(false)
    const [getData, { isLoading }] = useLazyGetCommercialQuery()
    const [getUsers] = usePostData(getData)

    const fetchFc = async (params) => {
        const data = await getUsers({ ...params, courses }, false)
        if (setUsersNumber) {
            setUsersNumber(data.count)
        }
        const res = { values: data.users, count: data.count } //res.users
        return res
    }

    //get users count
    const columns = [
        {
            field: "avatar",
            headerName: lang.IMAGE,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <UserAvatar user={params.row} />
                )
            }
        },
        {
            field: 'name',
            headerName: lang.NAME,
            width: 200,
        }, {
            field: 'email',
            headerName: lang.EMAIL,
            width: 200,
        }, {
            field: 'userName',
            headerName: lang.USERNAME,
            width: 150

        }, {
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            editable: true,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.isActive ? <TabInfo count={lang.ACTIVE} i={1} />
                            : <TabInfo count={lang.NOT_ACTIVE} i={3} />}
                    </Box>
                )
            }
        }, {
            field: 'phone',
            headerName: lang.PHONE,
            width: 200

        }, {
            field: 'familyPhone',
            headerName: lang.FAMILY_PHONE,
            width: 200
        }, {
            field: 'sendNotification',
            headerName: 'ارسال اشعار',
            type: 'actions',
            width: 200,
            renderCell: (p) => {
                return <BtnModal btnName={'ارسال رساله'} component={<NotificationsForm user={p.row} isCommercial={true} />} />
            }
        }, {
            field: 'wallet',
            headerName: lang.WALLET,
            width: 200,
            type: 'number',
        }, {
            field: 'role',
            headerName: lang.ROLE,
            type: 'singleSelect',
            width: 200,
            valueOptions: [user_roles.INREVIEW, user_roles.ONLINE, user_roles.STUDENT, user_roles.ADMIN, user_roles.SUBADMIN,],
            editable: true
        },
        {
            field: "grade",
            headerName: lang.GRADE,
            type: 'number',
            width: 200,
            // editable: true,
            // sortable: false,
            // filterable: false,
            // valueOptions: makeArrWithValueAndLabel(grades, { value: 'index', label: 'name' }),
        },
        {
            field: "government",
            headerName: 'المحافظه',
            type: 'singleSelect',
            width: 200,
            editable: true,
            valueOptions: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar', isNumber: true }),
        }, {
            field: 'marks',
            headerName: 'درجات الاسئله',
            type: 'number',
        }, {
            field: 'exam_marks',
            headerName: 'درجات الاختبارات',
            type: 'number',
        }, {
            field: 'totalPoints',
            headerName: 'نقاط الطالب',
            type: 'number',
        }, {
            field: "isResetPassword",
            headerName: 'اعاده ضبط كلمه السر',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button disabled={params.row.isResetPassword} onClick={() => {
                        setUserRegister(params.row)
                        setOpenReset(true)
                    }}>
                        اعاده ضبط كلمه السر
                    </Button>
                )
            }
        }, {
            field: 'devicesAllowed',
            headerName: 'عدد الاجهزه المسموح بها',
            editable: true,
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <TabInfo count={params.row.devicesAllowed} i={1} />
            }
        }, {
            field: 'devicesRegistered',
            headerName: 'عدد الاجهزه المسجله',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <TabInfo count={params.row.devicesRegistered?.length} i={3} />
            }
        }, {
            field: 'filterDevices',
            headerName: "مسح الاجهزه المسجله",
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <Button disabled={params.row?.devicesRegistered?.length === 0} onClick={() => {
                    setUserRegister(params.row)
                    setOpenRegisterModal(true)
                }}>
                    مسح الاجهزه المسجله
                </Button>
            }
        }, {
            field: 'fileConfirm',
            headerName: 'صوره التاكيد',
            width: 200,
            disableExport: true,
            filterable: false,
            sortable: false,
            renderCell: (params) => {
                return <UserAvatar user={params.row} url={params.row?.fileConfirm?.url} />
            }
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (params) => new Date(params),//*_*
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    const [sendData, { isLoading: updateLoader }] = useUpdateCommercialMutation()
    const [updateUser] = usePostData(sendData)

    const updateFc = async (values) => {
        const user = await updateUser(values)
        return user
    }


    const [deleteData, { isLoading: deleteLoader }] = useDeleteCommercialMutation()
    const [deleteUser] = usePostData(deleteData)

    const deleteFc = async (id) => {
        await deleteUser({ _id: id })
    }

    const viewFc = (user) => {
        navigate('/management/users/view?userName=' + user.userName)
    }

    // reset device registered
    const apiRef = useGridApiRef();
    const [userToRegister, setUserRegister] = useState()
    const [isOpenRegisterModal, setOpenRegisterModal] = useState(false)
    const resetDevicesReg = async () => {
        const user = await updateUser({ ...userToRegister, devicesRegistered: [] })
        apiRef.current.updateRows([{ ...user }])
        setUserRegister()
    }

    //reset Password
    const [openReset, setOpenReset] = useState(false)
    const resetPassword = async () => {
        const user = await updateUser({ _id: userToRegister._id, password: 'reset' })
        apiRef.current.updateRows([{ ...user }])
        setUserRegister()
    }

    const [deleteMany, deleteManyStatus] = useDeleteManyCommercialMutation()
    const [deleteManyUsers] = usePostData(deleteMany)

    const massActions = [{
        Component: ({ selectedIds = [] }) => {

            return <BtnModal
                btn={'ارسال الي : ' + selectedIds.length + ' ' + 'مستخدم'}
                component={<NotificationsForm users={selectedIds} isCommercial={true} />}
            />
        }
    }]

    return (
        <Section>
            {isShowTitle && (
                <>
                    <TitleSection title={'COmmercial'} />
                </>
            )}

            <FlexColumn sx={{ width: '100%' }}>
                {isShowCreate && <FilledHoverBtn onClick={() => setOpen(true)} >{lang.CREATE_USER}</FilledHoverBtn>}
            </FlexColumn>


            <MeDatagrid
                apiRef={apiRef}
                reset={[reset, grade]}
                setSelection={setExcludedUsers} massActions={massActions}
                type={'crud'} exportObj={exportObj(grades)} exportTitle={lang.USERS_PAGE}
                columns={columns} allStatuses={[deleteManyStatus]} deleteMany={deleteManyUsers}
                viewFc={viewFc} fetchFc={fetchFc} updateFc={updateFc} deleteFc={deleteFc}
                ViewRow={UserShowTable} viewRowModal={{
                    fullScreen: true
                }}
                loading={isLoading || updateLoader || deleteLoader}
                editing={
                    {
                        bgcolor: 'background.alt',
                        showSlots: ["density", "filter", "columns", "export"],
                        autoHeight: true, isPdf: true
                    }
                }
            />

            <ModalStyled open={open} setOpen={setOpen} >
                <CreateUser setReset={setReset} />
            </ModalStyled>

            <ModalStyled open={isOpenRegisterModal} setOpen={setOpenRegisterModal} title={'هل انت متاكد من مسح الاجهزه المسجله لهذا المستخدم ؟'} action={resetDevicesReg} />
            <ModalStyled open={openReset} setOpen={setOpenReset} title={'هل انت متاكد من اعاده ضبط كلمه السر ؟'} action={resetPassword} />
        </Section>
    )
}


export default CommercialUsers
