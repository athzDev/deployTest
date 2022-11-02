import React from 'react'
import UDBHeader from 'src/components/common/UdbHeader'
import { FirstCol, Header, MainInfoWrapper } from 'src/components/udb/commonStyle'

type Props = {}

const EditEmployee = (props: Props) => {
  return (
    <MainInfoWrapper>
        <Header>
            <FirstCol>
               <UDBHeader title="Edit Employee"/>
            </FirstCol>
        </Header>
    </MainInfoWrapper>
  )
}

export default EditEmployee