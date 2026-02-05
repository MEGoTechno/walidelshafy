import { lang } from "../../settings/constants/arlang"
import { getFullDate } from "../../settings/constants/dateConstants"
import governments from "../../settings/constants/governments"
import gradeConstants from "../../settings/constants/gradeConstants"
import { useLazyGetCoursesQuery } from "../../toolkit/apis/coursesApi"
import FullComponent from "../../tools/datagrid/FullComponent"
import { handelObjsOfArr, makeArrWithValueAndLabel } from "../../tools/fcs/MakeArray"
import TabInfo from "../ui/TabInfo"
import UserAvatar from "../users/UserAvatar"

function Courses({ filters, viewFc, updateFc, deleteFc, massActions, reset,selections,addColumns }) {

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
            field: 'isActive',
            headerName: lang.IS_ACTIVE,
            type: "boolean",
            isSwitch: true
        }, {
            field: "grade",
            headerName: lang.GRADE,
            type: 'singleSelect',
            width: 200,
            valueOptions: handelObjsOfArr(gradeConstants, { value: 'index', label: 'name' }),
        }, {
            field: "government",
            headerName: 'المحافظه',
            type: 'singleSelect',
            width: 200,
            valueOptions: makeArrWithValueAndLabel(governments, { value: 'id', label: 'governorate_name_ar', isNumber: true }),
        }, {
            field: 'createdAt',
            headerName: 'تاريخ الانشاء',
            width: 200,
            type: 'date',
            valueGetter: (createdAt) => new Date(createdAt),
            renderCell: (params) => {
                return <TabInfo count={getFullDate(params.row.createdAt)} i={1} />
            }
        },
    ]

    return (
        <div>
            <FullComponent data={{
                useFetch: useLazyGetCoursesQuery,
                resKey: 'courses',
                fetchFilters: filters,
                viewFc, deleteFc, updateFc,
                columns, massActions,selections,
                reset,addColumns
            }} />
        </div>
    )
}

export default Courses
