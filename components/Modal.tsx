import { Dispatch } from 'react';
import { Modal } from 'react-native';

type Props = {
    children: any
    setHidden: Dispatch<React.SetStateAction<boolean>>
    hiddenState: boolean
}

const ModalComponent = ({ children, setHidden, hiddenState }: Props) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={hiddenState}
            onRequestClose={() => setHidden(false)}>{children}</Modal>
    )
}

export default ModalComponent;