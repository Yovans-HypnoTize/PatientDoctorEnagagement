import React from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { Modal as RNModal, ModalProps } from 'react-native'

type PROPS = ModalProps & {
    isOpen: boolean,
    withInput?: boolean
}

export default function ModalComponent({ isOpen, withInput, children, ...rest }: PROPS) {
    const content = withInput ? (
        <KeyboardAvoidingView style={{alignItems:"center", justifyContent:"center", flex:1, paddingHorizontal:10, backgroundColor:"grey"}} behavior={Platform.OS === "ios"? "padding":"height"}>
            {children}
        </KeyboardAvoidingView>

    ) : (
        <View style={{alignItems:"center", justifyContent:"center", flex:1, paddingHorizontal:10, backgroundColor:"grey"}}>{children}</View>
    )
    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>
    )
}