import React from 'react'
import { Col, Row } from 'antd';

import UpdateProfileForm from './Partials/UpdateProfileForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteAccountForm from './Partials/DeleteAccountForm';

function Edit() {
  return (
    <div className='container mx-auto my-4 px-4'>
      <Row gutter={[16, 16]}>
        <Col span={24} className='flex justify-center'>
          <UpdateProfileForm />
        </Col>
        <Col span={24} className='flex justify-center'>
          <UpdatePasswordForm />
        </Col>
        <Col span={24} className='flex justify-center'>
          <DeleteAccountForm />
        </Col>
      </Row>
    </div >
  )
}

export default Edit;