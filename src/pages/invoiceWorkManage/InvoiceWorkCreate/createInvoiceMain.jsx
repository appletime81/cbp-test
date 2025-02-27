import { useState } from 'react';

// material-ui
import { Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// material-ui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// project import
import MainCard from 'components/MainCard';
import { handleNumber } from 'components/commonFunction';
import CreateInvoiceDetail from './createInvoiceDetail';
import InvoiceDataList from './invoiceDataList';
import { TextField } from '@mui/material/index';

import { useTranslation } from 'react-i18next';

// api
import { checkInvoiceNo } from 'components/apis';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

// ==============================|| SAMPLE PAGE ||============================== //

const InvoiceWorkManage = ({
    supplierName,
    setSupplierName,
    invoiceNo,
    setInvoiceNo,
    submarineCable,
    setSubmarineCable,
    workTitle,
    setWorkTitle,
    contractType,
    setContractType,
    issueDate,
    setIssueDate,
    dueDate,
    setDueDate,
    totalAmount,
    setTotalAmount,
    isPro,
    setIsPro,
    isLiability,
    setIsLiability,
    isRecharge,
    setIsRecharge,
    partyName,
    setPartyName,
    supNmList,
    subCableList
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const invoiceNoCheck = () => {
        let tmpArray = {
            InvoiceNo: invoiceNo
        };
        fetch(checkInvoiceNo, { method: 'POST', body: JSON.stringify(tmpArray) })
            .then((res) => res.json())
            .then((data) => {
                if (data.isExist) {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '發票號碼重複' } }));
                    setInvoiceNo('');
                } else {
                    dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'success', message: '發票號碼無重複' } }));
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    return (
        <MainCard title="發票工作主檔建立" sx={{ height: '100%' }}>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={1}>
                {/* row1 */}
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Submarine Cable')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜</InputLabel>
                        <Select value={submarineCable} label="發票供應商" onChange={(e) => setSubmarineCable(e.target.value)}>
                            {subCableList.map((i) => (
                                <MenuItem key={i.CableName} value={i.CableName}>
                                    {i.CableName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Work Title')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇海纜作業</InputLabel>
                        <Select value={workTitle} label="填寫海纜作業" onChange={(e) => setWorkTitle(e.target.value)}>
                            <MenuItem value={'Construction'}>Construction</MenuItem>
                            <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                            <MenuItem value={'O&M'}>O&M</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* row2 */}
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {/* 供應商： */}
                        {t('Supplier Name')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇供應商</InputLabel>
                        <Select value={supplierName} label="發票供應商" onChange={(e) => setSupplierName(e.target.value)}>
                            {supNmList.map((i) => (
                                <MenuItem key={i.SupplierName} value={i.SupplierName}>
                                    {i.SupplierName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Invoice No')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={invoiceNo}
                        size="small"
                        label="發票號碼"
                        inputProps={{
                            onBlur: () => {
                                invoiceNoCheck();
                            }
                        }}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                </Grid>
                {/* row3 */}
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Contract Type')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>選擇合約種類</InputLabel>
                        <Select value={contractType} label="發票供應商" onChange={(e) => setContractType(e.target.value)}>
                            <MenuItem value={'SC'}>SC</MenuItem>
                            <MenuItem value={'NSC'}>NSC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Issue Date')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                inputFormat="YYYY/MM/DD"
                                value={issueDate}
                                onChange={(e) => {
                                    setIssueDate(e);
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                {/* row4 */}
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Total Amount')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <TextField
                        value={totalAmount}
                        fullWidth
                        variant="outlined"
                        size="small"
                        // type="number"
                        label="填寫發票總金額"
                        onChange={(e) => {
                            setTotalAmount(handleNumber(e.target.value));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Due Date')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                inputFormat="YYYY/MM/DD"
                                value={dueDate}
                                onChange={(e) => setDueDate(e)}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                {/* row5 */}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Is Pro Forma')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <FormControl>
                        <RadioGroup
                            row
                            value={isPro}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(e) => setIsPro(e.target.value)}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="Y"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="N"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Is Liability')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <FormControl>
                        <RadioGroup
                            row
                            value={isLiability}
                            aria-labelledby="demo-radio-buttons-group-label"
                            // defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => setIsLiability(e.target.value)}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="攤分"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="不攤分"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {/* row6 */}
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {t('Is Recharge')}：
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <FormControl>
                        <RadioGroup
                            row
                            value={isRecharge}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => setIsRecharge(e.target.value)}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="Y"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: { lg: 14, xl: 20 } } }} />}
                                label="N"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                    <Typography variant="h5" sx={{ fontSize: { lg: '0.5rem', xl: '0.88rem' }, ml: { lg: '0rem', xl: '1.5rem' } }}>
                        {isLiability === false || isLiability === 'false' ? '會員名稱：' : ''}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    {isLiability === false || isLiability === 'false' ? (
                        <TextField
                            value={partyName}
                            variant="outlined"
                            size="small"
                            label="不須攤分請填寫名稱"
                            onChange={(e) => setPartyName(e.target.value)}
                        />
                    ) : (
                        ''
                    )}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default InvoiceWorkManage;
