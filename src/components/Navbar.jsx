import React, {useEffect, useState} from 'react';
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";

import icon from '../images/icon.png';

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(screenSize < 760){
            setActiveMenu(false);
        }else {
            setActiveMenu(true)
        }
    }, [screenSize]);

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar src={icon} size="large" />
                <Typography.Title level={3} className='logo'>
                    <Link to="/">
                        coininum.
                    </Link>
                </Typography.Title>
                <button className='menu-control-container'
                style={{cursor: 'pointer', borderRadius: '4px', width: '29px'}}
                onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </button>
            </div>
            {activeMenu && (
                <Menu theme='dark' >
                    <Menu.Item key='1'
                    icon={<HomeOutlined/>}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key='2'
                    icon={<FundOutlined/>}>
                        <Link to="/cryptocurrencies">
                            CryptoCurrencies
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item icon={<MoneyCollectOutlined/>}>
                        <Link to="/exchanges">
                            Exchanges
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key='3'
                    icon={<BulbOutlined/>}>
                        <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
            )}
        </div>
    );
};

export default Navbar;