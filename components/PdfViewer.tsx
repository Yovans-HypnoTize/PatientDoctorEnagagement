import React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = ({source}:any) => {
    const sourceURL = { uri: source, cache: true };

    const handleLoadComplete = ({numberOfPages, filePath}:any) => {
        console.log(`Number of pages: ${numberOfPages}`);
    };

    const handlePageChanged = ({page, numberOfPages}:any) => {
        console.log(`Current page: ${page}`);
    };

    const handleError = (error:any) => {
        console.log(error);
    };

    const handlePressLink = (uri:any) => {
        console.log(`Link pressed: ${uri}`);
    };

    return (
        <View style={styles.container}>
            <Pdf
                source={sourceURL}
                onLoadComplete={handleLoadComplete}
                onPageChanged={handlePageChanged}
                onError={handleError}
                onPressLink={handlePressLink}
                style={styles.pdf}
                renderActivityIndicator={() =>  <ActivityIndicator size="large" color="#00ff00" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default PdfViewer;
