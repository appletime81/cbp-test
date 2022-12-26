// assets
import { FolderOpenOutlined, TagOutlined } from '@ant-design/icons';

// constant
const icons = {
    FolderOpenOutlined,
    TagOutlined
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const invoiceWorkManagePage = {
    id: 'invoiceWorkManagePage',
    title: 'invoiceWorkManagePage',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'item1',
            title: '發票工作管理',
            type: 'collapse',
            url: '/InvoiceWorkManage',
            icon: icons.FolderOpenOutlined,
            breadcrumbs: true,
            children: [
                {
                    id: 'item11',
                    title: '新增發票工作檔',
                    type: 'item',
                    url: '/InvoiceWorkManage',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                },
                {
                    id: 'item12',
                    title: '查詢/異動/刪除工作檔',
                    type: 'item',
                    url: '/CreateJournal',
                    icon: icons.TagOutlined,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default invoiceWorkManagePage;
