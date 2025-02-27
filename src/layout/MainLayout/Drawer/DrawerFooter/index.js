// project import
import SimpleBar from 'components/third-party/SimpleBar';
import Notification from './Notification';
import Setting from './Setting';
import Profile from './Profile';
import Liability from './liabilityManage';
import DrawerFooterStyled from './DrawerFooterStyled';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <DrawerFooterStyled
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            },
            mb: 1
        }}
    >
        {/* <Notification /> */}
        <Setting />
        <Liability />
        <Profile />
        {/* <NavCard /> */}
    </DrawerFooterStyled>
);

export default DrawerContent;
