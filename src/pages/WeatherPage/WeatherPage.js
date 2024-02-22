import React, { useEffect, useState } from 'react';
import s from './weater__page.module.css';
import { Button, Form, Input, Spin, Table } from 'antd';
import { useGetWeatherQuery } from '../../store/weatherApi';
import { usePostWeatherInfoMutation } from '../../store/postWeatherApi';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// https://api.weatherapi.com/v1/current.json?key=e76d25837642475daed173913232212&q=Moscow&aqi=no

export const WeatherPage = () => {
  const [form] = Form.useForm();
  const [city, setCity] = useState('moscow');
  const { data = [], error, isLoading } = useGetWeatherQuery(city);
  const [postWeatherInfo, { isError }] = usePostWeatherInfoMutation();
  const [cityInfo, setCityInfo] = useState(null);
  const [errorObj, setErrorObj] = useState('');

  useEffect(() => {
    setErrorObj(error);
    if (error) {
      setCityInfo(null);
    }
    if (city === '') {
      setErrorObj('');
    }
  }, [error, city]);

  // При выполнении запроса сразу же выполняестся запись в БД
  const onFinish = async () => {
    setCityInfo(data);
    if (cityInfo) {
      await postWeatherInfo({
        name: cityInfo?.location.name,
        country: cityInfo?.location.country,
        temperature: cityInfo?.current.temp_c,
        conditions: cityInfo?.current.condition.text,
        speed: cityInfo?.current.wind_kph,
      }).unwrap();
    }
  };

  const columns = [
    {
      title: 'Название города',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Страна',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Температура',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: 'Погодные условия',
      dataIndex: 'conditions',
      key: 'conditions',
    },
    {
      title: 'Скорость ветра',
      dataIndex: 'speed',
      key: 'speed',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: cityInfo?.location.name,
      country: cityInfo?.location.country,
      temperature: cityInfo?.current.temp_c,
      conditions: cityInfo?.current.condition.text,
      speed: cityInfo?.current.wind_kph,
    },
  ];

  return (
    <div className={s.weather}>
      <h2 style={{ margin: '20px' }}>Введите название города</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 500,
          width: '100%',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: 'Please input city name.',
            },
            {
              validator: (_, value) => {
                setCity(value);
                if (value === '') {
                  return Promise.reject();
                } else if (/^[a-zA-Z]+$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    'City should include latin letters only'
                  );
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Найти
          </Button>
        </Form.Item>
      </Form>

      {isLoading ? (
        <div className={s.spinnerWrapper}>
          <Spin size="large" />
        </div>
      ) : (
        cityInfo && (
          <div className={s.info}>
            <img
              src={cityInfo.current.condition.icon}
              style={{ width: '100px' }}
              alt="иконка погоды"
            ></img>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            ></Table>
          </div>
        )
      )}
      {errorObj && (
        <div className={s.error__message}>{errorObj.data.error.message}</div>
      )}
      {isError && <div className={s.error__message}>{isError`asdasdasd`}</div>}
    </div>
  );
};
