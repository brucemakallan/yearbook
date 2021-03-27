import { StyleSheet, Font } from '@react-pdf/renderer';

import { colors } from '../../styles/global-theme';

Font.register({
  family: 'Raleway',
  src: '/assets/fonts/Raleway-Regular.ttf',
});

const pdfStyles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 20,
    fontFamily: 'Raleway',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

  // PROFILE
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: colors.primary.dark,
    marginVertical: 20,
  },
  profilePhotoContainer: {
    flexGrow: 1,
  },
  profilePhoto: {
    borderRadius: '50%',
    width: 120,
    height: 120,
  },
  profileInformation: {
    flexGrow: 2,
    width: 400,
    paddingLeft: 10,
  },
  profileName: {
    marginBottom: 3,
    fontSize: 18,
    color: colors.primary.main,
  },
  profileRegistrationNumber: {
    marginBottom: 3,
    fontSize: 15,
    color: colors.primary.main,
  },
  profileCourse: {
    marginBottom: 3,
    fontSize: 12,
    color: colors.secondary.main,
  },
  profileBio: {
    marginBottom: 3,
    fontSize: 11,
    textAlign: 'justify',
  },
  profileYear: {
    marginBottom: 3,
    fontSize: 10,
    color: 'black',
  },
});

export default pdfStyles;
