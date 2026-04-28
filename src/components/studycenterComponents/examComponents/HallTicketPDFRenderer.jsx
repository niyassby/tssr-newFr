import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg } from '@react-pdf/renderer';
import { format } from 'date-fns';
import head from "../../../assets/PdfHead.png"
import logo from '../../../assets/Logo.png'
import sealimg from '../../../assets/sealpng.png'

const url = import.meta.env.VITE_APP_URL || '';

// Define styles for exact design replication
const styles = StyleSheet.create({
    page: { padding: 25, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
    container: { border: '1pt solid black', padding: 25, position: 'relative', height: '100%', overflow: 'hidden' },
    headImg: { width: '90%', height: 105, marginLeft: 0, marginBottom: 12, },
    titleBox: { borderBottom: '1.5pt solid black', marginBottom: 20, paddingBottom: 10 },
    title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' },
    infoGrid: { flexDirection: 'row', marginBottom: 10 },
    infoColLeft: { flex: 5, paddingRight: 10 },
    infoColRight: { flex: 2, alignItems: 'center' },
    infoRow: { flexDirection: 'row', marginBottom: 8 },
    infoLabel: { width: 140, fontSize: 10 },
    infoValue: { flex: 1, fontSize: 10, fontWeight: '500' },
    profileImg: { width: 85, height: 110, border: '0.5pt solid black', borderRadius: 4, objectFit: 'cover' },
    qrContainer: { padding: 4, border: '1pt solid black', marginTop: 10 },
    qrImage: { width: 70, height: 70 },
    qrText: { fontSize: 8, textAlign: 'center', marginTop: 3, textTransform: 'uppercase' },
    instructionTitle: { fontSize: 12, fontWeight: 'bold', borderBottom: '1pt solid black', paddingBottom: 4, marginBottom: 12, alignSelf: 'flex-start' },
    instructionList: { marginLeft: 10 },
    instructionItem: { fontSize: 9, marginBottom: 6, flexDirection: 'row', lineHeight: 1.4 },
    bullet: { width: 20, fontSize: 15 },
    signatures: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 },
    signText: { fontSize: 9, color: '#4b5563' },
    seal: { position: 'absolute', right: 40, bottom: 85, width: 70, height: 70, opacity: 0.8, transform: 'rotate(-45deg)' },
    footer: { textAlign: 'center', fontSize: 9, marginTop: 25, border: '1pt solid #111827', padding: 11, gap: 5 },
    backgroundLogo: { position: 'absolute', top: 280, left: 130, width: 200, height: 200, opacity: 0.1, zIndex: -1 }
});

const instructions = [
    'This hall ticket is valid only if the candidates photograph and signature images are legible.',
    'Candidates will be permitted to appear for the examination ONLY after their credentials are verified by centre official.',
    'Candidates should take their places in the examination hall at least 10 minutes before the commencement of the examination.',
    'Candidates presenting themselves half an hour after the appointed time will not be admitted to the examination hall.',
    'Candidates should bring with them their hall ticket each day of the examination for inspection.',
    'Candidates should fill the facing sheet of the answer book in block letters.',
    'No candidates will be allowed to leave the examination hall till the expiry of half an hour after the commencement of the examination.',
    'Candidates are prohibited from bringing into the examination hall any book or portion of book, manuscript or paper and from communicating with any person inside or outside. copying or other unfair practices by the candidates is strictly prohibited.',
    'When the candidate need supplemental sheets or any other assistance he/she should stand up in the place.',
    'When the candidate has finished writing he/she shall stand up in the place may collect the answer book.'
];

export const HallTicketPDFDocument = ({ studentData, qrCodeUrl }) => {
    // We expect qrCodeUrl to be pre-generated as react-pdf doesn't support rendering promises locally

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    {/* Note: @react-pdf/renderer does not fully support inline SVG format from paths natively in all versions. 
              If the Logo.svg or pdfHead.svg fail to render, consider swapping them to .png equivalents! */}
                    <Image src={logo} style={styles.backgroundLogo} />
                    <Image src={head} style={styles.headImg} />

                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Hall Ticket</Text>
                    </View>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoColLeft}>
                            <View style={styles.infoRow}><Text style={styles.infoLabel}>Reg. No:</Text><Text style={styles.infoValue}>: {studentData?.registrationNo}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.infoLabel}>Name Of Student</Text><Text style={styles.infoValue}>: {studentData?.studentName?.toUpperCase()}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.infoLabel}>Course</Text><Text style={styles.infoValue}>: {studentData?.courseName}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.infoLabel}>Study Centre</Text><Text style={styles.infoValue}>: {studentData?.studyCenter}</Text></View>
                            <View style={styles.infoRow}><Text style={styles.infoLabel}>Examination Centre</Text><Text style={styles.infoValue}>: {studentData?.examCenter}</Text></View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Date of Examination</Text>
                                <Text style={styles.infoValue}>
                                    : {studentData?.examDate?.from ? format(new Date(studentData.examDate.from), "MMM dd, yyyy") : ''} to {studentData?.examDate?.to ? format(new Date(studentData.examDate.to), "MMM dd, yyyy") : ''}
                                </Text>
                            </View>
                            <View style={styles.infoRow}><Text style={styles.infoLabel}>Examination Time</Text><Text style={styles.infoValue}>: {studentData?.examTime?.from} to {studentData?.examTime?.to}</Text></View>
                        </View>

                        <View style={styles.infoColRight}>
                            {studentData?.profileImage ? (
                                <Image src={studentData.profileImage} style={styles.profileImg} />
                            ) : (
                                <View style={styles.profileImg} />
                            )}
                            <View style={styles.qrContainer}>
                                <Image src={qrCodeUrl} style={styles.qrImage} />
                                <Text style={styles.qrText}>Scan and verify</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.instructionTitle}>INSTRUCTION FOR THE CANDIDATES APPEARING ON EXAMINATION</Text>
                    <View style={styles.instructionList}>
                        {instructions.map((text, i) => (
                            <View style={styles.instructionItem} key={i}>
                                <Text style={styles.bullet}>{'\u2022'}</Text>
                                <Text style={{ flex: 1 }}>{text}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.signatures}>
                        <Text style={styles.signText}>Student Signature</Text>
                        <Text style={styles.signText}>Principal Signature</Text>
                        <Text style={styles.signText}>Controller Of Examination</Text>
                    </View>

                    <Image src={sealimg} style={styles.seal} />

                    <View style={styles.footer}>
                        <Text>ISSUED BY TSSR COUNCIL, OFFICE OF THE CENTRAL BOARD OF EXAMINATION,</Text>
                        <Text>CENTRAL ADMINISTRATIVE OFFICE, CALICUT, KERALA</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
