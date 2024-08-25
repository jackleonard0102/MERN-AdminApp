import React from 'react'
import { Col, Row } from 'antd';
import WelcomePageDetail from './Partials/Welcome'

function Edit() {
  return (
    <div className='container mx-auto my-4 px-4'>
      <Row gutter={[16, 16]}>
        <Col span={24} className='flex justify-center'>
          <WelcomePageDetail />
        </Col>
      </Row>
    </div >
  )
}

export default Edit;