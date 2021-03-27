import React from 'react';
import {
  Image, View, Text,
} from '@react-pdf/renderer';

import { images } from '../../styles/global-theme';

const PdfStudentProfile = ({ profile, pdfStyles }) => (
  <View style={pdfStyles.profileContainer}>
    <View style={pdfStyles.profilePhotoContainer}>
      <Image style={pdfStyles.profilePhoto} src={profile.displayPicture || images.anonymous} />
    </View>

    <View style={pdfStyles.profileInformation}>
      <Text style={pdfStyles.profileName}>
        {`${profile.user.firstName} ${profile.user.lastName}`}
      </Text>
      <Text style={pdfStyles.profileRegistrationNumber}>
        {profile.registrationNumber}
      </Text>
      <Text style={pdfStyles.profileCourse}>
        { // eslint-disable-next-line max-len
          `${profile.course.department.university.name} | ${profile.course.department.name} | ${profile.course.name}`
        }
      </Text>
      <Text style={pdfStyles.profileBio}>
        {profile.bio}
      </Text>
      <Text style={pdfStyles.profileYear}>
        {`Year of entry: ${profile.year}`}
      </Text>
    </View>
  </View>
);

export default PdfStudentProfile;
