import { useEffect, useState, useRef } from 'react';

// project import
import MainCard from 'components/MainCard';
import { TextField } from '@mui/material/index';

// material-ui
import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Table } from '@mui/material';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import Textarea from '@mui/joy/Textarea';

// table
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const CreateInvoiceDetail = ({ setInvoiceDetailInfo, invoiceDetailInfo, action }) => {
    const [billMilestone, setBillMilestone] = useState(''); //記帳段號
    // const [feeType, setFeeType] = useState(''); //收費種類
    const [feeItem, setFeeItem] = useState(''); //費用項目
    const [feeAmount, setFeeAmount] = useState(); //費用金額
    const [isEdit, setIsEdit] = useState(false);
    // const [editItem, setEditItem] = useState();
    const editItem = useRef();

    const itemDetailInitial = () => {
        setBillMilestone('');
        // setFeeType('');
        setFeeItem('');
        setFeeAmount(0);
    };

    const createData = (FeeItem, BillMilestone, FeeAmount) => {
        return { FeeItem, BillMilestone, FeeAmount };
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            // backgroundColor: theme.palette.common.gary,
            color: theme.palette.common.black,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem'
        }
    }));

    const itemDetailAdd = () => {
        let tmpArray = invoiceDetailInfo;
        tmpArray.push(createData(feeItem, billMilestone, Number(feeAmount)));
        setInvoiceDetailInfo([...tmpArray]);
        setInvoiceDetailInfo(tmpArray);
        itemDetailInitial();
    };

    const itemDetailDelete = (id) => {
        let tmpArray = invoiceDetailInfo;
        tmpArray.splice(id, 1);
        setInvoiceDetailInfo([...tmpArray]);
    };

    const itemDetailEdit = (id) => {
        setIsEdit(true);
        editItem.current = id;
        let tmpArray = invoiceDetailInfo[id];
        setBillMilestone(tmpArray.billMilestone);
        // setFeeType(tmpArray.feeType);
        setFeeItem(tmpArray.feeItem);
        setFeeAmount(tmpArray.feeAmount);
    };

    const itemDetailSave = () => {
        setIsEdit(false);
        itemDetailDelete(editItem.current);
        itemDetailAdd();
        editItem.current = 0;
    };

    const itemDetailCancel = () => {
        itemDetailInitial();
        setIsEdit(false);
    };

    useEffect(() => {
        itemDetailInitial();
    }, []);

    return (
        <MainCard title={`${action === 'Edit' ? '編輯' : ''}發票明細檔`} sx={{ height: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        記帳段號：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel size="small" id="billMilestone" disabled={action === 'View'}>
                            選擇記帳段號
                        </InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={billMilestone}
                            disabled={action === 'View'}
                            label="發票供應商"
                            size="small"
                            onChange={(e) => setBillMilestone(e.target.value)}
                        >
                            <MenuItem value={'BM9a'}>BM9a</MenuItem>
                            <MenuItem value={'BM9b'}>BM9b</MenuItem>
                            <MenuItem value={'BM12'}>BM12</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        費用金額：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={feeAmount}
                        disabled={action === 'View'}
                        type="number"
                        size="small"
                        label="填寫費用金額"
                        onChange={(e) => setFeeAmount(e.target.value)}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}>
                        收費種類：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel size="small" id="feeType" disabled={action === 'View'}>
                            選擇收費種類
                        </InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            disabled={action === 'View'}
                            value={feeType}
                            label="收費種類"
                            size="small"
                            onChange={(e) => setFeeType(e.target.value)}
                        >
                            <MenuItem value={'種類1'}>種類1</MenuItem>
                            <MenuItem value={'種類2'}>種類2</MenuItem>
                            <MenuItem value={'種類3'}>種類3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}
                {/* row2 */}
                <Grid item lg={2}>
                    <Typography
                        variant="h5"
                        size="small"
                        sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0.5rem', xl: '1.5rem' } }}
                    >
                        費用項目：
                    </Typography>
                </Grid>
                <Grid item lg={10}>
                    <StyledEngineProvider injectFirst>
                        <CssVarsProvider>
                            <Textarea
                                required
                                value={feeItem}
                                placeholder="填寫費用項目"
                                disabled={action === 'View'}
                                minRows={2}
                                maxRows={2}
                                onChange={(e) => setFeeItem(e.target.value)}
                            />
                        </CssVarsProvider>
                    </StyledEngineProvider>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} /> */}
                {action !== 'View' ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="end" alignItems="center">
                        {isEdit ? (
                            <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={itemDetailSave}>
                                儲存
                            </Button>
                        ) : (
                            <Button sx={{ mr: '0.25rem' }} variant="contained" onClick={itemDetailAdd}>
                                新增
                            </Button>
                        )}
                        {isEdit ? (
                            <Button sx={{ ml: '0.25rem' }} variant="contained" onClick={itemDetailCancel}>
                                取消
                            </Button>
                        ) : (
                            <Button sx={{ ml: '0.25rem' }} variant="contained" onClick={itemDetailInitial}>
                                清除
                            </Button>
                        )}
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item xs={12} sm={12} lg={12}>
                    <TableContainer component={Paper} sx={{ maxHeight: { lg: 125, md: 200 } }}>
                        <Table sx={{ minWidth: 300 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">記帳段號</StyledTableCell>
                                    <StyledTableCell align="center">費用項目</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoiceDetailInfo?.map((row, id) => (
                                    <TableRow
                                        key={row.FeeItem + row.BillMilestone}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row.FeeItem}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.BillMilestone}</StyledTableCell>
                                        <StyledTableCell align="center">{row.FeeAmount}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {action !== 'View' ? (
                                                <>
                                                    <Button
                                                        color="primary"
                                                        onClick={() => {
                                                            itemDetailEdit(id);
                                                        }}
                                                    >
                                                        編輯
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        onClick={() => {
                                                            itemDetailDelete(id);
                                                        }}
                                                    >
                                                        刪除
                                                    </Button>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default CreateInvoiceDetail;
