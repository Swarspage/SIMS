//helpers/excel/exportTransformers.js

const transformInternship = (i) => ({
    // Internship fields
    companyName:        i.companyName                     || '',
    role:               i.role                            || '',
    startDate:          i.startDate ? new Date(i.startDate).toLocaleDateString() : '',
    endDate:            i.endDate   ? new Date(i.endDate).toLocaleDateString()   : '',
    durationMonths:     i.durationMonths                  || '',
    isPaid:             i.stipendInfo?.isPaid ? 'Yes' : 'No',
    stipendAmount:      i.stipendInfo?.amount              || '',
    description:        i.description                     || '',
    internshipReport:   i.internshipReport                || '',
    photoProof:         i.photoProof                      || '',

    // Student identity
    stuID:              i.stuID?.toString()               || '',
    studentID:          i.studentID                       || '',
    PRN:                i.PRN                             || '',

    // Student name
    firstName:          i.studentName?.firstName          || '',
    fathersName:        i.studentName?.middleName         || '',
    lastName:           i.studentName?.lastName           || '',
    mothersName:        i.studentName?.motherName         || '',

    // Student academic
    year:               i.studentYear                     || '',
    division:           i.studentDivision                 || '',
    branch:             i.studentBranch                   || '',

    // Student personal
    dob:                i.studentDob ? new Date(i.studentDob).toLocaleDateString() : '',
    bloodGroup:         i.studentBloodGroup               || '',
    category:           i.studentCategory                 || '',
    abcId:              i.studentAbcId                    || '',

    // Student contact
    mobileNo:           i.studentMobileNo                 || '',
    parentMobileNo:     i.studentParentMobileNo           || '',
    email:              i.studentEmail                    || '',
    parentEmail:        i.studentParentEmail              || '',

    // Student current address
    currentStreet:      i.studentCurrentAddress?.street   || '',
    currentCity:        i.studentCurrentAddress?.city     || '',
    currentPincode:     i.studentCurrentAddress?.pincode  || '',

    // Student native address
    nativeStreet:       i.studentNativeAddress?.street    || '',
    nativeCity:         i.studentNativeAddress?.city      || '',
    nativePincode:      i.studentNativeAddress?.nativePincode || '',

    
});

const internshipColumnMap = {
    companyName:        'Company',
    role:               'Role',
    startDate:          'Start Date',
    endDate:            'End Date',
    durationMonths:     'Duration (Months)',
    isPaid:             'Paid?',
    stipendAmount:      'Stipend Amount',
    description:        'Description',
    internshipReport:   'Internship Report',
    photoProof:         'Photo Proof',
    stuID:              'Student ID (DB)',
    studentID:          'Student ID',
    PRN:                'PRN',
    firstName:          'First Name',
    fathersName:        "Father's Name",
    lastName:           'Last Name',
    mothersName:        "Mother's Name",
    year:               'Year',
    division:           'Division',
    branch:             'Branch',
    dob:                'Date of Birth',
    bloodGroup:         'Blood Group',
    category:           'Category',
    abcId:              'ABC ID',
    mobileNo:           'Mobile No.',
    parentMobileNo:     'Parent Mobile No.',
    email:              'Email',
    parentEmail:        'Parent Email',
    currentStreet:      'Current Street',
    currentCity:        'Current City',
    currentPincode:     'Current Pincode',
    nativeStreet:       'Native Street',
    nativeCity:         'Native City',
    nativePincode:      'Native Pincode',
    
};


const transformStudent = (s) => ({
    // Identity
    studentID:          s.studentID                        || '',
    email:              s.email                            || '',
    PRN:                s.PRN                              || '',

    // Name
    firstName:          s.name?.firstName                  || '',
    fathersName:        s.name?.middleName                 || '',
    lastName:           s.name?.lastName                   || '',
    mothersName:        s.name?.motherName                 || '',

    // Academic
    year:               s.year                             || '',
    division:           s.division                         || '',
    branch:             s.branch                           || '',

    // Personal
    dob:                s.dob ? new Date(s.dob).toLocaleDateString() : '',
    bloodGroup:         s.bloodGroup                       || '',
    category:           s.category                         || '',
    abcId:              s.abcId                            || '',

    // Contact
    mobileNo:           s.mobileNo                         || '',
    parentMobileNo:     s.parentMobileNo                   || '',
    parentEmail:        s.parentEmail                      || '',

    // Current address
    currentStreet:      s.currentAddress?.street           || '',
    currentCity:        s.currentAddress?.city             || '',
    currentPincode:     s.currentAddress?.pincode          || '',

    // Native address
    nativeStreet:       s.nativeAddress?.street            || '',
    nativeCity:         s.nativeAddress?.city              || '',
    nativePincode:      s.nativeAddress?.nativePincode           || '',
});

const studentColumnMap = {
    studentID:          'Student ID',
    PRN:                'PRN',
    email:              'Email',
    firstName:          'First Name',
    fathersName:        "Father's Name",
    lastName:           'Last Name',
    mothersName:        "Mother's Name",
    year:               'Year',
    division:           'Division',
    branch:             'Branch',
    dob:                'Date of Birth',
    bloodGroup:         'Blood Group',
    category:           'Category',
    abcId:              'ABC ID',
    mobileNo:           'Mobile No.',
    parentMobileNo:     'Parent Mobile No.',
    parentEmail:        'Parent Email',
    currentStreet:      'Current Street',
    currentCity:        'Current City',
    currentPincode:     'Current Pincode',
    nativeStreet:       'Native Street',
    nativeCity:         'Native City',
    nativePincode:      'Native Pincode',
};

module.exports = { transformInternship, transformStudent,studentColumnMap, internshipColumnMap };