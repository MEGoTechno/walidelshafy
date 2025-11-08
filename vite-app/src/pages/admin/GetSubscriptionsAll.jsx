import Section from '../../style/mui/styled/Section'
import GetSubscriptions from '../../components/subscriptions/GetSubscriptions'
import TitleWithDividers from '../../components/ui/TitleWithDividers'
import Users from '../../components/all/Users'
import TabsAutoStyled from '../../style/mui/styled/TabsAutoStyled'
import { user_roles } from '../../settings/constants/roles'

function GetSubscriptionsAll() {
    const tabs = [
        {
            label: 'الاشتراكات',
            component: <GetSubscriptions />
        }, {
            label: 'الطلاب الغير مشتركون',
            component: <Users filters={{ courses: 'size_split_0', role: ['!=' + user_roles.ADMIN, '!=' + user_roles.SUBADMIN] }} />
        },]

    return (
        <Section>
            <TitleWithDividers title={'اشتراكات المنصه'} />
            <TabsAutoStyled originalTabs={tabs} />
        </Section>
    )
}

export default GetSubscriptionsAll
