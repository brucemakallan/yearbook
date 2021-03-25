import React from 'react';
import {
  PDFViewer, Page, Text, Document,
} from '@react-pdf/renderer';

import pdfStyles from './styles';
import PdfStudentProfile from './pdfStudentProfile';

const PdfGenerator = ({
  students = 0,
  courses = 0,
  departments = 0,
  universities = 0,
  filteredStudentProfiles,
}) => (
  <PDFViewer width="100%" height="100%">
    <Document>
      <Page size="A4" style={pdfStyles.body}>
        <Text style={pdfStyles.header} fixed>&copy; Yearbook</Text>
        <Text style={pdfStyles.title}>Yearbook</Text>
        <Text style={pdfStyles.author}>
          { // eslint-disable-next-line max-len
            `${students} Student${students > 1 ? 's' : ''} ${courses} Course${courses > 1 ? 's' : ''} ${departments} Department${departments > 1 ? 's' : ''} ${universities} Universit${universities > 1 ? 'ies' : 'y'}`
          }
        </Text>

        {filteredStudentProfiles.map((profile) => (
          <PdfStudentProfile key={profile.id} profile={profile} pdfStyles={pdfStyles} />
        ))}

        <Text style={pdfStyles.pageNumber} fixed render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} />
      </Page>
    </Document>
  </PDFViewer>
);

export default PdfGenerator;
