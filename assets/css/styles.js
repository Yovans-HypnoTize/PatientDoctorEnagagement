
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const COLORS = {
  primary: '#007071',
  secondary: '#F1F1F1',
  error: 'red',
  textPrimary: '#fff',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textDark: {
    color: 'black',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: '2%',
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    color: 'black',
  },
  inputWithGap: {
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  registerText: {
    alignSelf: 'center',
    marginBottom: 16,
    fontSize: 16,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 564 / 167,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  }
});

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    height: "100%",
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: '2%',
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputWithGap: {
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  registerText: {
    alignSelf: 'center',
    marginBottom: 16,
    fontSize: 16,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 564 / 167,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  takePhotoBtn: {
    width: "40%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 50
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 25
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#fff', // White background for the loader
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export const documentStyles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  messageBtn: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderWidth: 1,
    borderColor: '#0086FE',
    backgroundColor: '#0086FE',
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
  backButtonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 13,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  documentContainer: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  video: {
    display: "none",
    height: 0,
    width: 0
  },
  filenameWrapper: {
    fontWeight: 'bold', marginTop: 2, marginHorizontal: 10
  },
});

export const cardStyles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 7,
    width: (width - 30) / 2,
  },
  container: {
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 7,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#D3D3D3",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginHorizontal: 10,
    marginVertical: 25,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  icon: {
    width: 40,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    flexShrink: 1,
  },
});

export const homeStyles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
  },
  searchIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  searchWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 7,
    width: 300,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 5
  },
  cardNameWrapper: {
    height: 40,
    elevation: 5,
    backgroundColor: "#EDEADE",
    borderRadius: 5,
    marginHorizontal: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  documentLoadingContainer: {
    height: 500,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 75
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#888',
    marginTop: 100,
    fontWeight: "bold"
  },
  userDataModalContainer: {
    backgroundColor: '#fff', padding: 10, borderRadius: 20, width: '100%', height:600, position:'static',
  },
  closebtnWrapper: {
    flexDirection: 'row', justifyContent: 'flex-end',
  },
  profileIcon: {
    width: 35, height: 35,
  },
});

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  chatHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#fff',
  },
  clearChatBtn: {
    padding: 10,
    width: 130,
    top: 40,
    position: 'absolute',
    right: 10,
    backgroundColor: '#E5E4E2',
    borderRadius: 10,
    zIndex: 1,
  },
  horizontalbar: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 105,
    marginHorizontal: 3,
    marginVertical: 2,
  },
  backButton: {
    paddingVertical: 12,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20
  },
  messagesContainer: {
    padding: 10,
    paddingBottom: 95,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 85,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 15,
  },
  messageInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    height: 45,
    borderColor: '#D3D3D3',
    fontSize: 18,
    fontWeight: 500,
  },
  sendMessageBtn: {
    marginHorizontal: 15
  },
  getMessage: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#E5E4E2',
    padding: 10,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    alignSelf: 'flex-start', // Ensures the message container adjusts based on content
    minWidth: 50, // Optional: Set a minimum width for very short content
    maxWidth: 300, // Limit the maximum width to 300
  },
  getMessageText: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 23,
    paddingRight: 25
    // flex: 1,
  },
  micIconContainer: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    paddingLeft: 4
  },
  sendMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0086FE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    marginBottom: 0,
    borderRadius: 8,
    maxWidth: 300
  },
  sendMessageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 25
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007071',
  },
  backButtonContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    justifyContent: "space-between",
  },
  safeAreacontainer: {
    flex: 1,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  fileNameText: {
    fontWeight: "bold", marginTop: 3, paddingHorizontal: 10, width: "82%"
  },
  messageLoadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'
  },
  messageLoadingContainerText: {
    textAlign: 'center', fontSize: 18, fontWeight: "medium", color: "grey"
  }
});

export const userModalStyles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 5,
  },
  headerText: {
    fontWeight:'bold',
    fontSize:16,
    marginBottom:8,
    color: COLORS.primary,
  },
  profileImage: {
    width: 60,
    height: 60,
    marginBottom: 20,
    borderRadius:15,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: '2%',
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    borderColor: '#000',
  },
  inputAge: {
    width: '100%',
    padding: 12,
    marginBottom: '2%',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },
  inputWithGap: {
    marginBottom: 15,
  },
  focusedInput: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 15,
    minWidth: width * 0.4,
    maxWidth: width * 0.9,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  submitBtnWrapper: {
    alignItems: "center", marginTop: 10, marginBottom: 20
  },
});

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  genderContainer: {
    marginTop: 5,
    marginBottom: 15
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    marginBottom: 20,
    borderRadius:15,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 50
  },
  footer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 22,
    backgroundColor: '#CBE4DE',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
  },
  logoutText: {
    color:COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  backButton: {
    width: "100%",
    paddingVertical: 12,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  input: {
    width: 280,
    padding: 12,
    marginBottom: '2%',
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputEnabled: {
    width: '100%',
    padding: 12,
    marginBottom: '2%',
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: '#000',
  },
  inputWithGap: {
    marginBottom: 20,
  },
  focusedInput: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});