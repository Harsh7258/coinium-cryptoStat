import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptosDetailsQuery } from '../services/cryptoAPI';
import { useGetCryptosHistoryQuery } from '../services/cryptoAPI';

import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState('7d');
    const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptosHistoryQuery({coinId, timePeriod});

     const cryptoDetails = data?.data?.coin;

    //  const [crypto, setCrypto] = useState(null);
    //  useEffect(() => {
    //     setCrypto(cryptoDetails)
        console.log(data);
        console.log(coinHistory);
    //  }, [])

    if(isFetching) return 'Loading...'

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },

    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },

    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },

    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },

    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },

    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },

    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },

    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
    
    return (
        <>
        <Col className='coin-detail-container'>
            <Title level={2} className='coin-name'>
                {cryptoDetails.name} ({cryptoDetails.symbol}) Price
            </Title>
            <p>
                {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
            </p>
        </Col>
        <Select 
            defaultValue="7d"
            className='select-timeperiod'
            placeholder='Select Time Period'
            onChange={(value) => setTimePeriod(value)}>
                {time.map((date) => <Option key={date}>
                    {date}
                </Option>)}
        </Select>

        <LineChart coinHistroy={coinHistory} 
        currentPrice={millify(cryptoDetails.price)} 
        coinName={cryptoDetails.name} />

        <Col className='stats-container'>
            <Col className='coin-value-statistics'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className='coin-details'>
                        {cryptoDetails.name} Value Statistics
                    </Title>
                    <p>
                    An overview showing the statistics of 
                    <span
                    className='color-text'> {cryptoDetails.name}</span>, such as the base and quote currency, the rank, and trading volume.
                    </p>
                </Col>
                {stats.map(({icon, title, value}) => (
                    <Col className='coin-stats'>
                        <Col className='coin-stats-name'>
                            <Text> {icon} </Text>
                            <Text> {title} </Text>
                        </Col>
                        <Text className='stats'> {value} </Text>
                    </Col>
                ))}
            </Col>
            <Col className='other-value-info'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className='coin-details'>
                        {cryptoDetails.name} Other Crypto Statistics
                    </Title>
                    <p>
                    An overview showing the statistics of 
                    <span
                    className='color-text'> all CryptoCurrencies </span>
                    </p>
                </Col>
                {genericStats.map(({icon, title, value}) => (
                    <Col className='coin-stats'>
                        <Col className='coin-stats-name'>
                            <Text> {icon} </Text>
                            <Text> {title} </Text>
                        </Col>
                        <Text className='stats'> {value} </Text>
                    </Col>
                ))}
            </Col>
        </Col>
        <Col className='coin-desc-link'>
            <Row className='coin-desc'>
                <Title level={4} className='coin-details-heading'>
                   <span className='color-text'>
                   What is {cryptoDetails.name}?
                    </span> 
                    <br/>
                    {HTMLReactParser(cryptoDetails.description)}
                </Title>
            </Row>
            <Col className='coin-links'>
                <Title level={4} className='coin-details-heading'>
                    <span className='color-text'>
                    {cryptoDetails.name} Links:
                    </span>
                </Title>
                {cryptoDetails.links.map((link) => (
                    <Row className='coin-link' key={link.name}>
                        <Title level={5} className='link-name'>
                            {link.type}
                        </Title>
                        <a href={link.url} target='_blank' rel='noreferrer'>
                            {link.name}
                        </a>
                    </Row>
                ))}
            </Col>
        </Col>
        </>
    );
};

export default CryptoDetails;