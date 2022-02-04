import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    getEventDetailAction,
    getAllEventsAction,
    getCategoriesAction
} from '../../Redux/actions/events';

import {
    Card, 
    Col,
    Row,
    Modal,
    Button,
    Input,
    Select,
    Switch,
    Skeleton
} from 'antd';
import {
    ClockCircleTwoTone,
    CloudTwoTone,
    EnvironmentTwoTone,
    AppstoreTwoTone
} from '@ant-design/icons';

import moment  from 'moment';

const { Search } = Input;
const { Option } = Select;

const Events = () => {

    const initialState = {
        category: '',
        search: '',
        isVirtual: false,
    }


    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [visible, setVisible] = useState(false);

    const eventData = useSelector((state) => state.eventData);
    const { 
        loading,
        searchLoading,
        detailsLoading,
        events,
        details,
        category
     } = eventData;

    useEffect(() => {
        dispatch(getAllEventsAction({ q: '', category: '', isVirtual: false }));
        dispatch(getCategoriesAction());

    }, [dispatch]);

    useEffect(() => { 

    }, [state]);

    const handleChange = (name, value) => {
        console.log(name, value);
        setState({
            ...state,
            [name]: value
        });
    }

     console.log(events, '<<<');
    const viewDetails = (id) => {
        console.log('view details', id);
        dispatch(getEventDetailAction({ id }));
        setVisible(true);

    }

    const searchEvents = () => { 
        const { search, isVirtual, category } = state;
        if(search.length > 2) { 
            dispatch(getAllEventsAction({ q: search, category, isVirtual }));
        }
    }

  return (
        <div style={{ background: '#f8fbff', width: '70%', margin: '0 auto', padding: '2%'}}>
            <h1 style={{ textAlign: 'center', fontSize: '35px'}}>TechEventsUK</h1>
            <Row gutter={16}>
                <Col span={4}>
                    <Select
                        showSearch
                        onChange={(e) => handleChange('category', e)}
                        size="large"
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="">All Categories</Option>
                        {category?.map((item, index) => (
                            <Option value={item._id}>{item.name}</Option>
                        ))}

                    </Select>
                </Col>
                <Col span={4} >
                Virtual Event <Switch onChange={(e) => handleChange('isVirtual', e)} defaultChecked={false} checkedChildren="Yes" unCheckedChildren="No" />
                </Col>

                <Col span={16}>
                    <Search placeholder="input search text"  onChange={(e) => handleChange('search', e.target.value)} onSearch={searchEvents} enterButton="Search" size="large" loading={searchLoading} />
                </Col>

            </Row>
            <br />
            <Row gutter={16}>
                {events?.length > 0 ? events.map((item, index) => (
                    <Col span={8} key={index}>
                        <Card title={item?.title} bordered={true} style={{ cursor: 'pointer'}} onClick={() => viewDetails(item._id)} loading={loading}>
                            <Skeleton loading={loading} active>
                                <ClockCircleTwoTone /> {moment(item?.date).format('MMMM Do YYYY, h:mm:ss a')}
                                <br />
                                <br />
                                <CloudTwoTone /> Virtual Event: {item?.isVirtual ? 'Yes' : 'No'}
                                <br />
                                <br />
                                <EnvironmentTwoTone /> Address: {item?.address ? item?.address : 'Not Available'}
                                <br />
                                <br />
                                <AppstoreTwoTone /> Category: {item?.category ? item?.category.name : 'Not Available'}
                                <br />
                                <br />
                                {item.description?.substring(0, 69)}...
                            </Skeleton>
                        </Card>
                        <br/>
                    </Col>
                )): <Skeleton active />}

                </Row>

                <Modal
                    title={details?.title ? details?.title : 'Loading Event Details...'}
                    visible={visible} 
                    onCancel={() => setVisible(false)}
                    footer={[
                        <Button key="back" onClick={() => setVisible(false)}>Back</Button>,
                    ]}
                >
                     <Skeleton loading={detailsLoading} active>
                            <ClockCircleTwoTone /> {moment(details?.date).format('MMMM Do YYYY, h:mm:ss a')}
                            <br />
                            <br />
                            <CloudTwoTone /> Virtual Event: {details?.isVirtual ? 'Yes' : 'No'}
                            <br />
                            <br />
                            <EnvironmentTwoTone /> Address: {details?.address ? details?.address : 'Not Available'}
                            <br />
                            <br />
                            <AppstoreTwoTone /> Category: {details?.category ? details?.category.name : 'Not Available'}
                            <br />
                            <br />
                            {details.description}
                    </Skeleton>
                </Modal>
        </div>
    );
};

export default Events;
