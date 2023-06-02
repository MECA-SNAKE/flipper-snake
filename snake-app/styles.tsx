import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    input: {
        width: 250,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    container4Buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    titleMode: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16

    },

    subTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
        marginRight: 200,

    },


    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 8,
        marginVertical: 6,
        marginHorizontal: 15,
    },

    button2: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonMotion: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        width: '80%',
        height: 40,
        paddingHorizontal: 16,
        marginTop: 16,
        fontSize: 16,
    },
    numberValueText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    pressedButton: {
        backgroundColor: '#1D6403',
    },

    arrowButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roundButton: {
        backgroundColor: '#2196F3',
        width: 60,
        height: 60,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
    },
    disabledButton: {
        opacity: 0,
    },
    shit: {

    }
});

export default styles